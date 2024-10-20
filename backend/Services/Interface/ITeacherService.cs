using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using _3w1m.Dtos.Teacher;

namespace _3w1m.Services.Interface;
public interface ITeacherService
{
    /// <summary>
    /// Retrieves detailed information about the teacher.
    /// </summary>
    /// <param name="teacherId">The unique identifier of the teacher.</param>
    /// <returns>The task result contains the student's detailed information.</returns>
    /// <exception cref="ResourceNotFoundException">Thrown when the teacher is not found.</exception>
    Task<TeacherDetailDto> GetTeacherByIdAsync(int teacherId);

    /// <summary>
    /// Retrieves a collection of all teachers.
    /// </summary>
    /// <returns>The task result contains a collection of teacher DTOs.</returns>
    Task<(int count, IEnumerable<TeacherDto> teachers)> GetTeachersAsync(TeacherCollectionQueryDto queryDto);

    /// <summary>
    /// Creates a new teacher record.
    /// </summary>
    /// <param name="teacherData">The DTO containing the information for the new teacher.</param>
    /// <returns>The task result contains the created teacher's information.</returns>
    Task<TeacherDto> CreateTeacherAsync(CreateTeacherRequestDto teacherData);

    /// <summary>
    /// Updates an existing teacher's information.
    /// </summary>
    /// <param name="teacherId">The unique identifier of the teacher.</param>
    /// <param name="teacherData">The DTO contains the upcoming changes of the teacher's information</param>
    /// <returns>The task result contains the updated teacher's information.</returns>
    /// <exception cref="ResourceNotFoundException">Thrown when the teacher is not found.</exception>
    Task<TeacherDto> UpdateTeacherAsync(int teacherId, UpdateTeacherRequestDto teacherData);
}
