using _3w1m.Dtos;
using _3w1m.Dtos.Course;
using _3w1m.Dtos.Student;
using _3w1m.Dtos.Teacher;
using _3w1m.Models.Domain;
using AutoMapper;

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

        CreateMap<CreateTeacherRequestDto, Teacher>();
        CreateMap<Teacher, TeacherDto>();
        CreateMap<TeacherDto, Teacher>();
        CreateMap<Teacher, TeacherDetailDto>()
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email));
        CreateMap<Teacher, TeacherMinimalDto>();

        CreateMap<CreateRequestCourseDto, Course>();
        CreateMap<Course, CourseDto>();
        CreateMap<CourseDto, Course>();
        CreateMap<Course, CourseDetailDto>();
        CreateMap<CourseDetailDto, Course>();
    }
}