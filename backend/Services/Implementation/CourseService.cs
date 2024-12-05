using _3w1m.Data;
using _3w1m.Dtos;
using _3w1m.Dtos.Course;
using _3w1m.Dtos.Student;
using _3w1m.Dtos.Teacher;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using _3w1m.Specifications.Interface;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace _3w1m.Services.Implementation;

public class CourseService : ICourseService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CourseService(ApplicationDbContext context, IMapper mapper, IStudentService studentService,
        ITeacherService teacherService)
    {
        _context = context;
        _mapper = mapper;
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

    public async Task<CourseDto> CreateCourseAsync(CreateCourseRequestDto data)
    {
        var courses = _context.Courses;

        if (await courses.AnyAsync(c => c.Code == data.Code))
        {
            throw new ConflictException($"Course with code {data.Code} already exists.");
        }

        var course = _mapper.Map<Course>(data);
        courses.Add(course);
        await _context.SaveChangesAsync();

        return _mapper.Map<CourseDto>(course);
    }

    public async Task<CourseDto> UpdateCourseAsync(int entityId, UpdateRequestCourseDto requestCourseData)
    {
        ArgumentNullException.ThrowIfNull(requestCourseData);
        var course = await _context.Courses.Include(c => c.Teacher).FirstOrDefaultAsync(c => c.CourseId == entityId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        if (requestCourseData.Name != null)
        {
            course.Name = requestCourseData.Name;
        }

        if (requestCourseData.Description != null)
        {
            course.Description = requestCourseData.Description;
        }

        if (requestCourseData.TeacherId != null)
        {
            var newTeacher =
                await _context.Teachers.FirstOrDefaultAsync(t => t.TeacherId == requestCourseData.TeacherId);
            if (newTeacher == null)
            {
                throw new ResourceNotFoundException($"Teacher with id {requestCourseData.TeacherId} not found");
            }

            course.TeacherId = newTeacher.TeacherId;
            course.Teacher = newTeacher;
        }

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

    public async Task<IEnumerable<StudentDto>> EnrollStudentIntoCourseAsync(int courseId,
        EnrollStudentToCourseRequestDto enrollRequest)
    {
        var studentIds = enrollRequest.StudentIds;

        var course = await _context.Courses.FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException($"Course with id {courseId} not found.");
        }

        var (isExist, nonExistedStudent) = IsStudentExist(studentIds.ToList());
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
                StudentId = studentIds.ElementAt(i),
                EnrolledAt = new DateOnly(now.Year, now.Month, now.Day)
            });
        }

        await _context.SaveChangesAsync();
        var (_, students) = await GetStudentsInCourseAsync(courseId);

        return students;
    }

    public Task<TeacherDto> EnrollTeacherIntoCourseAsync(int courseId, EnrollTeacherToCourseRequestDto enrollRequest)
    {
        var teacherId = enrollRequest.TeacherId;
        var course = _context.Courses.FirstOrDefault(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException($"Course with id {courseId} not found.");
        }

        var teacher = _context.Teachers.FirstOrDefault(t => t.TeacherId == teacherId);
        if (teacher == null)
        {
            throw new ResourceNotFoundException($"Teacher with id {teacherId} not found.");
        }

        if (course.TeacherId == teacherId)
        {
            throw new ConflictException($"Teacher with id {teacherId} is already teaching the course.");
        }

        course.TeacherId = teacherId;
        course.Teacher = teacher;

        _context.SaveChanges();

        return Task.FromResult(_mapper.Map<TeacherDto>(teacher));
    }

    public async Task<bool> CourseEnrolledUserValidationAsync(int courseId, String userId)
    {
        var course = _context.Courses.Include(c => c.Teacher).FirstOrDefault(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException($"Course with id {courseId} not found.");
        }

        var enrollments = _context.Enrollments.Include(en => en.Student);
        var isStudentEnrolled = await enrollments.AnyAsync(en =>
            en.CourseId == courseId && en.Student.UserId == userId);

        var isTeacherEnrolled = course.Teacher!.UserId == userId;

        var isEnrolled = isStudentEnrolled || isTeacherEnrolled;

        return isEnrolled;
    }

    public async Task<(int, IEnumerable<CourseDto>)> GetEnrolledCoursesOfUserAsync(CourseCollectionQueryDto queryDto,
        ICourseSpecification spec)
    {
        var coursesDbSet = _context.Courses;
        var courses = spec.Apply(coursesDbSet);

        courses = ApplyFilter(courses, queryDto);
        courses = ApplyOrder(courses, queryDto);
        var count = await courses.CountAsync();
        courses = ApplyPagination(courses, queryDto);

        return (count, _mapper.Map<IEnumerable<CourseDto>>(await courses.ToListAsync()));
    }

    public async Task<CourseDetailDto> GetCourseDetailAsync(int courseId)
    {
        var course = await _context.Courses.Include(course => course.Teacher)
            .FirstOrDefaultAsync(course => course.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var students = await _context.Enrollments.Where(enrollment => enrollment.CourseId == courseId)
            .Include(enrollment => enrollment.Student).Select(enrollment => enrollment.Student).ToListAsync();

        var courseDetailDto = _mapper.Map<CourseDetailDto>(course);
        courseDetailDto.Students = _mapper.Map<IEnumerable<StudentDto>>(students);

        return courseDetailDto;
    }

    private IQueryable<Course> ApplyFilter(IQueryable<Course> query, CourseCollectionQueryDto queryDto)
    {
        if (!string.IsNullOrWhiteSpace(queryDto.Name))
        {
            query = query.Where(s => s.Name.ToLower().Contains(queryDto.Name.ToLower()));
        }

        if (queryDto.Code != null && queryDto.Code.Any())
        {
            var normalizedCodes = queryDto.Code
                .Where(c => !string.IsNullOrWhiteSpace(c))
                .Select(c => c.ToUpper());

            query = query.Where(s => normalizedCodes.Contains(s.Code.ToUpper()));
        }

        if (queryDto.StartDateFrom.HasValue)
        {
            query = query.Where(s => s.StartDate >= queryDto.StartDateFrom.Value);
        }

        if (queryDto.StartDateTo.HasValue)
        {
            query = query.Where(s => s.StartDate <= queryDto.StartDateTo.Value);
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