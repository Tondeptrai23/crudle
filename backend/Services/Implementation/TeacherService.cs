using _3w1m.Constants;
using _3w1m.Data;
using _3w1m.Dtos.Teacher;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace _3w1m.Services.Implementation;

public class TeacherService : ITeacherService
{
    private readonly ApplicationDbContext _context;
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public TeacherService(ApplicationDbContext context, IUserService userService, IMapper mapper)
    {
        _mapper = mapper;
        _userService = userService;
        _context = context;
    }

    public async Task<TeacherDto> CreateTeacherAsync(CreateTeacherRequestDto teacherData)
    {
        ArgumentNullException.ThrowIfNull(teacherData);

        if (await _context.Teachers.AnyAsync(t => t.TeacherId == teacherData.TeacherId))
        {
            throw new ConflictException("Teacher already exists");
        }

        if (await _context.Users.AnyAsync(u => u.Email == teacherData.Email))
        {
            throw new ConflictException("Email already exists");
        }

        await using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var userId =
                await _userService.CreateUserAsync(teacherData.Email, teacherData.Password, CourseRoles.Teacher);
            if (userId == null)
            {
                throw new Exception("Failed to create user");
            }

            var teacher = _mapper.Map<Teacher>(teacherData);
            teacher.UserId = userId;

            var createdTeacher = await _context.Teachers.AddAsync(teacher);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return _mapper.Map<TeacherDto>(createdTeacher.Entity);
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<TeacherDetailDto> GetTeacherByIdAsync(int teacherId)
    {
        var teacher = await _context.Teachers.Include(t => t.User).FirstOrDefaultAsync(t => t.TeacherId == teacherId);

        if (teacher == null)
        {
            throw new ResourceNotFoundException("Teacher not found");
        }

        return _mapper.Map<TeacherDetailDto>(teacher);
    }

    public async Task<(int count, IEnumerable<TeacherDto> teachers)> GetTeachersAsync(
        TeacherCollectionQueryDto? queryDto)
    {
        queryDto ??= new TeacherCollectionQueryDto();

        var teachers = _context.Teachers.AsQueryable();
        teachers = ApplyFilter(teachers, queryDto);
        teachers = ApplyOrder(teachers, queryDto);

        var totalTeachers = await teachers.CountAsync();
        teachers = ApplyPagination(teachers, queryDto);

        return (totalTeachers, _mapper.Map<IEnumerable<TeacherDto>>(teachers));
    }

    public async Task<TeacherDto> UpdateTeacherAsync(int teacherId, UpdateTeacherRequestDto teacherData)
    {
        ArgumentNullException.ThrowIfNull(teacherData);
        var teacher = await _context.Teachers.FirstOrDefaultAsync(t => t.TeacherId == teacherId);
        if (teacher == null)
        {
            throw new ResourceNotFoundException("Teacher not found");
        }

        if (teacherData.Fullname != null)
        {
            teacher.Fullname = teacherData.Fullname;
        }

        if (teacherData.ContactEmail != null)
        {
            teacher.ContactEmail = teacherData.ContactEmail;
        }

        if (teacherData.ContactPhone != null)
        {
            teacher.ContactPhone = teacherData.ContactPhone;
        }

        _context.Teachers.Update(teacher);
        await _context.SaveChangesAsync();

        return _mapper.Map<TeacherDto>(teacher);
    }

    public async Task<TeacherDto> GetTeacherByUserIdAsync(string userId)
    {
        var teacher = await _context.Teachers.FirstOrDefaultAsync(teacher => teacher.UserId == userId);
        if (teacher == null)
        {
            throw new ResourceNotFoundException("Teacher not found");
        }

        return _mapper.Map<TeacherDto>(teacher);
    }

    private IQueryable<Teacher> ApplyFilter(IQueryable<Teacher> teachers, TeacherCollectionQueryDto queryDto)
    {
        if (queryDto.TeacherId != null)
        {
            teachers = teachers.Where(t => t.TeacherId == queryDto.TeacherId);
        }

        if (queryDto.Fullname != null)
        {
            teachers = teachers.Where(t => t.Fullname == queryDto.Fullname);
        }

        teachers = teachers.Where(t => t.ContactEmail == queryDto.ContactEmail);

        teachers = teachers.Where(t => t.ContactPhone == queryDto.ContactPhone);

        return teachers;
    }

    private IQueryable<Teacher> ApplyPagination(IQueryable<Teacher> teachers, TeacherCollectionQueryDto queryDto)
    {
        return teachers.Skip((queryDto.Page - 1) * queryDto.Size).Take(queryDto.Size);
    }

    private IQueryable<Teacher> ApplyOrder(IQueryable<Teacher> teachers, TeacherCollectionQueryDto queryDto)
    {
        var orderBy = queryDto.OrderBy?.ToLower();
        var orderDirection = queryDto.OrderDirection?.ToLower();
        teachers = orderBy switch
        {
            "teacherid" => orderDirection == "desc"
                ? teachers.OrderByDescending(t => t.TeacherId)
                : teachers.OrderBy(t => t.TeacherId),
            "fullname" => orderDirection == "desc"
                ? teachers.OrderByDescending(t => t.Fullname)
                : teachers.OrderBy(t => t.Fullname),
            "contactemail" => orderDirection == "desc"
                ? teachers.OrderByDescending(t => t.ContactEmail)
                : teachers.OrderBy(t => t.ContactEmail),
            "contactphone" => orderDirection == "desc"
                ? teachers.OrderByDescending(t => t.ContactPhone)
                : teachers.OrderBy(t => t.ContactPhone),
            _ => teachers.OrderBy(t => t.TeacherId)
        };

        return teachers;
    }
}