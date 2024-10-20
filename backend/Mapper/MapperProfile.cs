using AutoMapper;
using _3w1m.Dtos;
using _3w1m.Dtos.Student;
using _3w1m.Models;
using _3w1m.Models.Domain;
using _3w1m.Dtos.Teacher;

namespace _3w1m.Mapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateRequestCourseDto, Course>();
        CreateMap<CourseDto, Course>();
        CreateMap<Course, CourseDto>();
        
        CreateMap<CreateStudentRequestDto, Student>();
        CreateMap<StudentDto, Student>();
        CreateMap<Student, StudentDto>();
        
        CreateMap<Student, StudentDetailDto>()
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email));

        CreateMap<Teacher, TeacherDto>();
        CreateMap<Teacher, TeacherDto>().ReverseMap();
        CreateMap<Teacher, TeacherDetailDto>()
            .ForMember(dest => dest.ContactEmail, opt => opt.MapFrom(src => src.User.Email));
    }
}