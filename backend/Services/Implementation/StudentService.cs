using _3w1m.Data;
using _3w1m.Dtos.Student;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace _3w1m.Services.Implementation;

public class StudentService : IStudentService
{
    private readonly ApplicationDbContext _context;
    private readonly IUserService _userService;
    private readonly IMapper _mapper;

    public StudentService(ApplicationDbContext context, IUserService userService, IMapper mapper)
    {
        _context = context;
        _userService = userService;
        _mapper = mapper;
    }
    
    public async Task<StudentDetailDto> GetStudentByIdAsync(int studentId)
    {
        // Get student id associated with its user
        var student = await _context.Students
            .Include(s => s.User)
            .FirstOrDefaultAsync(s => s.StudentId == studentId);

        if (student == null)
        {
            throw new ResourceNotFoundException("Student not found");
        }
        
        return _mapper.Map<StudentDetailDto>(student);
    }
    
    public async Task<(int count, IEnumerable<StudentDto> students)> GetStudentsAsync(GetStudentsQueryDto request)
    {
        request ??= new GetStudentsQueryDto();
        
        IQueryable<Student> query = _context.Students;
        
        query = ApplyFilter(query, request);
        query = ApplyOrder(query, request);

        var totalItems = await query.CountAsync();
        query = ApplyPagination(query, request);
        
        var students = await query.ToListAsync();
        
        return (totalItems, _mapper.Map<IEnumerable<StudentDto>>(students));
    }

    public async Task<StudentDto> CreateStudentAsync(CreateStudentRequestDto studentData)
    {
        ArgumentNullException.ThrowIfNull(studentData);

        if (await _context.Students.AnyAsync(s => s.StudentId == studentData.StudentId))
        {
            throw new ConflictException("StudentId already exists");
        }
        
        if (await _context.Users.AnyAsync(u => u.Email == studentData.Email))
        {
            throw new ConflictException("Email already exists");
        }

        // Wrap in transaction
        await using var transaction = await _context.Database.BeginTransactionAsync();
        try
        {
            var userId = await _userService.CreateUserAsync(studentData.Email, studentData.Password);
            if (userId == null)
            {
                throw new Exception("Failed to create student");
            }

            var student = _mapper.Map<Student>(studentData);
            student.UserId = userId;

            var createdStudent =  await _context.Students.AddAsync(student);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
                
            return _mapper.Map<StudentDto>(createdStudent.Entity);
        }
        catch (Exception e)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<StudentDto> UpdateStudentAsync(int StudentId, UpdateStudentRequestDto studentData)
    {
        ArgumentNullException.ThrowIfNull(studentData);

        var student = await _context.Students.FindAsync(StudentId);
        if (student == null)
        {
            throw new ResourceNotFoundException("Student not found");
        }

        // Check null fields
        if (studentData.Fullname != null)
        {
            student.Fullname = studentData.Fullname;
        }
        if (studentData.DateOfBirth.HasValue)
        {
            student.DateOfBirth = studentData.DateOfBirth.Value;
        }
        
        _context.Students.Update(student);
        await _context.SaveChangesAsync();
        
        return _mapper.Map<StudentDto>(student);
    }
    
    private IQueryable<Student> ApplyFilter(IQueryable<Student> query, GetStudentsQueryDto request)
    {
        if (request.StudentId != null)
        {
            query = query.Where(s => s.StudentId == request.StudentId);
        }
        
        if (request.Fullname != null)
        {
            query = query.Where(s => s.Fullname.Contains(request.Fullname));
        }
        
        if(request.DateOfBirth != null)
        {
            query = query.Where(s => s.DateOfBirth == request.DateOfBirth);
        }

        return query;
    }
    
    private IQueryable<Student> ApplyOrder(IQueryable<Student> query, GetStudentsQueryDto request)
    {
        var orderBy = request.OrderBy?.ToLower();
        var orderDirection = request.OrderDirection?.ToLower();
        query = orderBy switch
        {
            "studentid" => orderDirection == "desc" 
                ? query.OrderByDescending(s => s.StudentId) 
                : query.OrderBy(s => s.StudentId),
            
            "fullname" => orderDirection == "desc" 
                ? query.OrderByDescending(s => s.Fullname) 
                : query.OrderBy(s => s.Fullname),
            
            "dateofbirth" => orderDirection == "desc" 
                ? query.OrderByDescending(s => s.DateOfBirth) 
                : query.OrderBy(s => s.DateOfBirth),
            
            _ => query.OrderBy(s => s.StudentId)
        };

        return query;
    }
    
    private IQueryable<Student> ApplyPagination(IQueryable<Student> query, GetStudentsQueryDto request)
    {
        return query.Skip((request.Page - 1) * request.Size)
            .Take(request.Size);
    }
}