using _3w1m.Data;
using _3w1m.Dtos;
using _3w1m.Dtos.Course;
using _3w1m.Dtos.Student;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace _3w1m.Services.Implementation;

public class CourseService : ICourseService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly IStudentService _studentService;
    private readonly ITeacherService _teacherService;

    public CourseService(ApplicationDbContext context, IMapper mapper, IStudentService studentService,
        ITeacherService teacherService)
    {
        _context = context;
        _mapper = mapper;
        _studentService = studentService;
        _teacherService = teacherService;
    }

    public async Task<CourseDto> GetCourseByIdAsync(int courseId)
    {
        var course = await _context.Courses
            .Include(c => c.Teacher)
            .FirstOrDefaultAsync(c => c.CourseId == courseId);

        if (course == null)
        {
            throw new ResourceNotFoundException($"Course with id {courseId} not found.");
        }

        return _mapper.Map<CourseDto>(course);
    }

    public async Task<(int count, IEnumerable<CourseDto> courses)> GetCoursesAsync(CourseCollectionQueryDto? request)
    {
        IQueryable<Course> query = _context.Courses.Include(c => c.Teacher);

        if (request == null)
        {
            request = new CourseCollectionQueryDto();
        }

        query = ApplyFilter(query, request);
        query = ApplyOrder(query, request);

        int countAsync = await query.CountAsync();
        query = ApplyPagination(query, request);

        return (countAsync, _mapper.Map<IEnumerable<CourseDto>>(await query.ToListAsync()));
    }

    public async Task<CourseDto> CreateCourseAsync(CreateRequestCourseDto courseData)
    {
        var courses = _context.Courses;

        if (await courses.AnyAsync(c => c.CourseId == courseData.CourseId))
        {
            throw new ConflictException($"Course with id {courseData.CourseId} already exists.");
        }

        if (await courses.AnyAsync(c => c.Code == courseData.Code))
        {
            throw new ConflictException($"Course with code {courseData.Code} already exists.");
        }

        var teacher = await _context.Teachers.FirstOrDefaultAsync(t => t.TeacherId == courseData.TeacherId);
        if (teacher == null)
        {
            throw new ResourceNotFoundException($"Teacher with id {courseData.TeacherId} not found");
        }

        var course = _mapper.Map<Course>(courseData);
        courses.Add(course);
        await _context.SaveChangesAsync();

        return _mapper.Map<CourseDto>(course);
    }

    public async Task<CourseDto> UpdateCourseAsync(int entityId, UpdateCourseRequestDto courseData)
    {
        ArgumentNullException.ThrowIfNull(courseData);
        var course = await _context.Courses.Include(c => c.Teacher).FirstOrDefaultAsync(c => c.CourseId == entityId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        if (courseData.Name != null)
        {
            course.Name = courseData.Name;
        }

        if (courseData.Description != null)
        {
            course.Description = courseData.Description;
        }

        var newTeacher = await _context.Teachers.FirstOrDefaultAsync(t => t.TeacherId == courseData.TeacherId);
        if (newTeacher == null)
        {
            throw new ResourceNotFoundException($"Teacher with id {courseData.TeacherId} not found");
        }

        course.TeacherId = newTeacher.TeacherId;
        course.Teacher = newTeacher;

        await _context.SaveChangesAsync();

        return _mapper.Map<CourseDto>(course);
    }

    public async Task<(int count, IEnumerable<StudentDto> students)> GetStudentsInCourseAsync(int courseId)
    {
        var course = await _context.Courses.FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var students = await _context.Enrollments
            .Include(e => e.Student)
            .Where(e => e.CourseId == courseId)
            .Select(e => e.Student)
            .ToListAsync();

        return (students.Count, _mapper.Map<IEnumerable<StudentDto>>(students));
    }

    public async Task<IEnumerable<StudentDto>> EnrollStudentIntoCourseAsync(int courseId, List<int> studentIds)
    {
        var course = await _context.Courses.FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException($"Course with id {courseId} not found.");
        }

        var (isExist, nonExistedStudent) = IsStudentExist(studentIds);
        if (isExist == false)
        {
            throw new ResourceNotFoundException($"Student with id {nonExistedStudent} not found");
        }

        var enrolledStudent = _context.Enrollments.Where(en => en.CourseId == courseId)
            .Where(en => studentIds.Contains(en.StudentId)).ToList();
        if (enrolledStudent.Count != 0)
        {
            var enrolledStudentIds = string.Join(", ", enrolledStudent.Select(s => s.StudentId));
            throw new ConflictException($"Students with IDs: {enrolledStudentIds} are already enrolled in the course");
        }

        var nonEnrolledStudents = studentIds.Except(enrolledStudent.Select(student => student.StudentId)).ToList();
        var enrollments = _context.Enrollments;

        for (var i = 0; i < nonEnrolledStudents.Count; i++)
        {
            var now = DateTime.Now;
            await enrollments.AddAsync(new Enrollment
            {
                CourseId = courseId,
                StudentId = studentIds[i],
                EnrolledAt = new DateOnly(now.Year, now.Month, now.Day)
            });
        }

        await _context.SaveChangesAsync();
        var (_, students) = await GetStudentsInCourseAsync(courseId);

        return students;
    }

    public async Task<IEnumerable<CourseDto>> GetEnrolledCourseOfAStudentAsync(int studentId)
    {
        var student = await _context.Students
            .Where(s => s.StudentId == studentId)
            .FirstOrDefaultAsync();

        if (student == null)
        {
            throw new ResourceNotFoundException("Student not found");
        }

        var enrollments = await _context.Enrollments.Where(e => e.StudentId == studentId)
            .Select(enrollment => enrollment.CourseId).ToListAsync();

        var courses = await _context.Courses.Include(course => course.Teacher)
            .Where(course => enrollments.Contains(course.CourseId)).ToListAsync();

        return _mapper.Map<IEnumerable<CourseDto>>(courses);
    }

    public async Task<CourseDetailDto> GetCourseDetailAsync(int teacherId, int courseId)
    {
        var teacher = await _context.Teachers.FirstOrDefaultAsync(t => t.TeacherId == teacherId);
        if (teacher == null)
        {
            throw new ResourceNotFoundException("Teacher not found");
        }

        var course = await _context.Courses.Include(course => course.Teacher)
            .FirstOrDefaultAsync(course => course.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        if (course.TeacherId != teacherId)
        {
            throw new ForbiddenException("This teacher does not have access to this course");
        }

        var students = await _context.Enrollments.Where(enrollment => enrollment.CourseId == courseId)
            .Include(enrollment => enrollment.Student).Select(enrollment => enrollment.Student).ToListAsync();

        var courseDetailDto = _mapper.Map<CourseDetailDto>(course);
        courseDetailDto.Students = _mapper.Map<IEnumerable<StudentDto>>(students);

        return courseDetailDto;
    }

    private IQueryable<Course> ApplyFilter(IQueryable<Course> query, CourseCollectionQueryDto queryDto)
    {
        if (queryDto.CourseId != null)
        {
            query = query.Where(s => s.CourseId == queryDto.CourseId);
        }

        if (queryDto.Name != null)
        {
            query = query.Where(s => s.Name.Contains(queryDto.Name));
        }

        if (queryDto.Code != null)
        {
            query = query.Where(s => s.Code == queryDto.Code);
        }

        if (queryDto.StartDate != null)
        {
            query = query.Where(s => s.StartDate == queryDto.StartDate);
        }

        if (queryDto.Code != null)
        {
            query = query.Where(s => s.Code == queryDto.Code);
        }

        return query;
    }

    private static IQueryable<Course> ApplyOrder(IQueryable<Course> query, CourseCollectionQueryDto queryDto)
    {
        var orderBy = queryDto.OrderBy?.ToLower();
        var orderDirection = queryDto.OrderDirection?.ToLower();
        query = orderBy switch
        {
            "courseid" => orderDirection == "desc"
                ? query.OrderByDescending(s => s.CourseId)
                : query.OrderBy(s => s.CourseId),

            "name" => orderDirection == "desc"
                ? query.OrderByDescending(s => s.Name)
                : query.OrderBy(s => s.Name),

            "code" => orderDirection == "desc"
                ? query.OrderByDescending(s => s.Code)
                : query.OrderBy(s => s.Code),
            "startdate" => orderDirection == "desc"
                ? query.OrderByDescending(s => s.StartDate)
                : query.OrderBy(s => s.StartDate),
            _ => query.OrderBy(s => s.CourseId)
        };

        return query;
    }

    private IQueryable<Course> ApplyPagination(IQueryable<Course> query, CourseCollectionQueryDto queryDto)
    {
        return query.Skip((queryDto.Page - 1) * queryDto.Size)
            .Take(queryDto.Size);
    }

    private (bool, int?) IsStudentExist(List<int> studentIds)
    {
        var students = _context.Students.Select(studentId => studentId.StudentId);

        foreach (var studentId in studentIds)
        {
            if (!students.Any(id => id == studentId))
            {
                return (false, studentId);
            }
        }

        return (true, null);
    }
}