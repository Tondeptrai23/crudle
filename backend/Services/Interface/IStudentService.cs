using _3w1m.Dtos.Student;
using _3w1m.Models.Domain;

namespace _3w1m.Services.Interface;

public interface IStudentService
{
    Task<StudentDto> GetStudentByIdAsync(int studentId);
    Task<IEnumerable<StudentDto>> GetStudentsAsync();
    Task<StudentDto> CreateStudentAsync(CreateStudentRequestDto student);
    Task<StudentDto> UpdateStudentAsync(int StudentId, UpdateStudentRequestDto student);
    Task DeleteStudentAsync(int studentId);
}