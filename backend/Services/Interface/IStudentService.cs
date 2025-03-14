using _3w1m.Dtos.Student;
using _3w1m.Models.Exceptions;

namespace _3w1m.Services.Interface;

/// <summary>
/// Provides services for managing student data.
/// </summary>
public interface IStudentService
{
    /// <summary>
    /// Retrieves detailed information about a specific student.
    /// </summary>
    /// <param name="studentId">The unique identifier of the student.</param>
    /// <returns>The task result contains the student's detailed information.</returns>
    /// <exception cref="ResourceNotFoundException">Thrown when the student is not found.</exception>
    Task<StudentDetailDto> GetStudentByIdAsync(int studentId);

    /// <summary>
    /// Retrieves a collection of all students.
    /// </summary>
    /// <returns>The task result contains a collection of student DTOs.</returns>
    public Task<(int count, IEnumerable<StudentDto> students)> GetStudentsAsync(StudentCollectionQueryDto? request);
    
    /// <summary>
    /// Creates a new student record.
    /// </summary>
    /// <param name="student">The DTO containing the information for the new student.</param>
    /// <returns>The task result contains the created student's information.</returns>
    /// <exception cref="ConflictException">Thrown when trying to create an existing resource.</exception>
    Task<StudentDto> CreateStudentAsync(CreateStudentRequestDto student);
    
    /// <summary>
    /// Updates an existing student's information.
    /// </summary>
    /// <param name="studentId">The unique identifier of the student to update.</param>
    /// <param name="student">The DTO containing the updated.</param>
    /// <returns>The task result contains the updated student's information.</returns>
    /// <exception cref="ResourceNotFoundException">Thrown when the student is not found.</exception>
    Task<StudentDto> UpdateStudentAsync(int studentId, UpdateStudentRequestDto student);
    
    /// <summary>
    /// Get a student's information by user id
    /// </summary>
    /// <param name="userId">The unique identifier of the user</param>
    /// <returns>The task contains information of student matching the userId</returns>
    /// <exception cref="ResourceNotFoundException">Thrown when can not find a student matching the userId argument</exception>
    Task<StudentDto> GetStudentByUserIdAsync(string userId);
}