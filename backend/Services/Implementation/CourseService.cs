using _3w1m.Data;
using _3w1m.Dtos;
using _3w1m.Models.Domain;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace _3w1m.Services.Implementation;

public class CourseService : ICourseService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    
    public CourseService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<CourseDto> GetByIdAsync(int id)
    {
        var course = await _context.Courses
            .FirstOrDefaultAsync(c => c.CourseId == id);

        return _mapper.Map<CourseDto>(course);
    }

    public async Task<IEnumerable<CourseDto>> GetAllAsync()
    {
        var courses = await _context.Courses
            .ToListAsync();
        
        return courses.Select(c => _mapper.Map<CourseDto>(c));
    }

    public async Task<CourseDto> AddAsync(CreateRequestCourseDto entity)
    {
        var course = _mapper.Map<Course>(entity);
        
        await _context.Courses.AddAsync(course);
        
        await _context.SaveChangesAsync();
        
        return _mapper.Map<CourseDto>(course);
    }

    public Task<CourseDto> UpdateAsync(int entityId, CourseDto entity)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(int entityId)
    {
        throw new NotImplementedException();
    }

    public Task<bool> IsCourseExists(CourseDto entity)
    {
        throw new NotImplementedException();
    }
}