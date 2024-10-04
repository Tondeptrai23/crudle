using AutoMapper;
using _3w1m.Dtos;
using _3w1m.Models;
using _3w1m.Models.Domain;

namespace _3w1m.Mapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateRequestCourseDto, Course>();
        CreateMap<CourseDto, Course>();
        CreateMap<Course, CourseDto>();
    }
}