using _3w1m.Dtos;
using _3w1m.Dtos.Course;
using _3w1m.Dtos.Student;
using _3w1m.Dtos.Teacher;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Specifications.Interface;

namespace _3w1m.Services.Interface;

public interface ICourseService
{
    /// <summary>
    /// Retrieves detailed information about a specific course.
    /// </summary>
    /// <param name="courseId">The unique identifier of the course.</param>
    /// <returns>The task result contains the course's detailed information.</returns>
    /// <exception cref="ResourceNotFoundException">Thrown when the student is not found.</exception>
    Task<CourseDto> GetCourseByIdAsync(int courseId);

    /// <summary>
    /// Retrieves a collection of courses based on the query parameters.
    /// </summary>
    /// <param name="queryDto"></param>
    /// <returns>The task result contains a collection of course Dto</returns>
    Task<(int count, IEnumerable<CourseDto> courses)> GetCoursesAsync(CourseCollectionQueryDto queryDto);

    /// <summary>
    /// Create a new course record.
    /// </summary>
    /// <param name="data">The Dto contain the information for the new course</param>
    /// <returns>The task result contains the recently created course's information</returns>
    /// <exception cref="ConflictException">Thrown when the course is already exist.</exception>
    /// <exception cref="ResourceNotFoundException">Thrown when the teachers id provided from user not found.</exception>
    Task<CourseDto> CreateCourseAsync(CreateCourseRequestDto data);

    /// <summary>
    /// Updates an existing course's information.
    /// </summary>
    /// <param name="courseId">The unique identifier of the course.</param>
    /// <param name="requestCourseData">The DTO contains the upcoming changes of the course's information</param>
    /// <returns>The task result contains the updated course's information.</returns>
    /// <exception cref="ResourceNotFoundException">Thrown when the course is not found.</exception>
    Task<CourseDto> UpdateCourseAsync(int courseId, UpdateRequestCourseDto requestCourseData);

    /// <summary>
    /// Get all students enrolled in the course
    /// </summary>
    /// <param name="courseId">The unique identifier of the course.</param>
    /// <returns>The task contain quantity and a collection of course Dto.</returns>
    /// <exception cref="ResourceNotFoundException">Thrown when the course is not found.</exception>
    Task<(int count, IEnumerable<StudentDto> students)> GetStudentsInCourseAsync(int courseId);

    /// <summary>
    /// Enroll student into the course
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="studentId">The collection of unique identifier of students</param>
    /// <returns>The task contain a collection of Student</returns>
    /// <exception cref="ResourceNotFoundException">Thrown when the course or the student is not found</exception>
    /// <exception cref="ConflictException">Thrown when the student is already enrolled in the course</exception>
    Task<IEnumerable<StudentDto>> EnrollStudentIntoCourseAsync(int courseId,
        EnrollStudentToCourseRequestDto enrollRequest);

    /// <summary>
    /// Get all courses that a student is enrolled in
    /// </summary>
    /// <params name="queryDto">The query parameters</params>s
    /// <params name="spec">The specification for the query</params>
    /// <returns>The task contains a collection of courses that a student is enrolled</returns>
    /// <exception cref="ResourceNotFoundException">Thrown when the student is not found</exception>
    Task<(int, IEnumerable<CourseDto>)> GetEnrolledCoursesOfUserAsync(CourseCollectionQueryDto queryDto, ICourseSpecification spec);

    /// <summary>
    /// Get all courses that a teacher is teaching
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <returns>The task contains a collection of courses that a teacher is teaching</returns>
    /// <exception cref="ResourceNotFoundException">Thrown when the teacher or the course is not found</exception>
    /// <exception cref="ForbiddenException">Thrown when the teacher is not teaching the course</exception>
    Task<CourseDetailDto> GetCourseDetailAsync(int courseId);

    /// <summary>
    /// Enroll teacher into the course
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="teacherId">The collection of unique identifier of teachers</param>
    /// <returns>The task contain a collection of Teacher</returns>
    /// <exception cref="ResourceNotFoundException">Thrown when the course or the teacher is not found</exception>
    /// <exception cref="ConflictException">Thrown when the teacher is already enrolled in the course</exception>
    /// <exception cref="ForbiddenException">Thrown when the teacher is not teaching the course</exception>
    Task<TeacherDto> EnrollTeacherIntoCourseAsync(int courseId, EnrollTeacherToCourseRequestDto enrollRequest);
    
    /// <summary>
    /// Validate if the user is enrolled in the course
    /// </summary>
    /// <param name="courseId">The unique identifier of the course</param>
    /// <param name="userId">The unique identifier of the user</param>
    /// <returns>The task contain a boolean value</returns>
    Task<bool> CourseEnrolledUserValidationAsync(int courseId, String userId);
}