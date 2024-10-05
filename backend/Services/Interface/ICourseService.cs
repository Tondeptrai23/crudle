using _3w1m.Dtos;
using _3w1m.Models.Domain;

namespace _3w1m.Services.Interface;

public interface ICourseService
{
    Task<CourseDto> GetByIdAsync(int id);
    Task<IEnumerable<CourseDto>> GetAllAsync();
    Task<CourseDto> AddAsync(CreateRequestCourseDto entity);
    Task<CourseDto> UpdateAsync(int entityId, CourseDto entity);
    Task DeleteAsync(int entityId);
    Task<bool> IsCourseExists(CourseDto entity);
}