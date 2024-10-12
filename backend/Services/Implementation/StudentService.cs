using _3w1m.Data;
using _3w1m.Dtos.Student;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using AutoMapper;

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
    
    public async Task<StudentDto> GetStudentByIdAsync(int studentId)
    {
        var student = await _context.Students.FindAsync(studentId);
        
        if (student == null)
        {
            throw new ResourceNotFoundException("Student not found");
        }
        
        return _mapper.Map<StudentDto>(student);
    }

    public Task<IEnumerable<StudentDto>> GetStudentsAsync()
    {
        throw new NotImplementedException();
    }

    public async Task<StudentDto> CreateStudentAsync(CreateStudentRequestDto studentData)
    {
        using (var transaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                var userId = await _userService.CreateStudentAsync(studentData.Email, studentData.Password);
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
    }

    public Task<StudentDto> UpdateStudentAsync(int StudentId, UpdateStudentRequestDto student)
    {
        throw new NotImplementedException();
    }

    public Task DeleteStudentAsync(int studentId)
    {
        throw new NotImplementedException();
    }
}