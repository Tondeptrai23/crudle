using _3w1m.Dtos;
using _3w1m.Dtos.Article;
using _3w1m.Dtos.Course;
using _3w1m.Dtos.Student;
using _3w1m.Dtos.Teacher;
using _3w1m.Models.Domain;
using AutoMapper;
using Microsoft.EntityFrameworkCore.Migrations.Operations.Builders;

namespace _3w1m.Mapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateCourseRequestDto, Course>();
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

        CreateMap<CreateCourseRequestDto, Course>();
        CreateMap<Course, CourseDto>();
        CreateMap<CourseDto, Course>();
        CreateMap<Course, CourseDetailDto>();
        CreateMap<CourseDetailDto, Course>();
        CreateMap<UpdateRequestCourseDto, Course>();

        CreateMap<ArticleDto, Article>();
        CreateMap<Article, ArticleDto>()
            .ForMember(dest => dest.ReadAt,
                opt => 
                        opt.MapFrom(scr => scr.ArticleProgresses.Any() ? scr.ArticleProgresses.First().ReadAt : null));
        CreateMap<ArticleDto, StudentArticleResponseDto>()
            .ForMember(dest => dest.IsRead,
                opt => opt.MapFrom(src => src.ReadAt != null));
        CreateMap<ArticleDto, TeacherArticleResponseDto>();

        CreateMap<CreateArticleRequestDto, Article>();
        
        CreateMap<ArticleDto, TeacherMinimalArticleDto>();
        CreateMap<ArticleDto, StudentMinimalArticleDto>()
            .ForMember(dest => dest.IsRead, opt =>
                opt.MapFrom(src => src.ReadAt != null))
            .ForMember(dest => dest.ReadAt, opt =>
                opt.MapFrom(src => src.ReadAt));

        CreateMap<ArticleProgress, UpdateArticleProgressDto>();
        CreateMap<UpdateArticleProgressDto, ArticleProgress>();
    }
}