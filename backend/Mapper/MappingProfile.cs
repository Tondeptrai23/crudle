using _3w1m.Dtos;
using _3w1m.Dtos.Answers;
using _3w1m.Dtos.Article;
using _3w1m.Dtos.Article;
using _3w1m.Dtos.Assignment;
using _3w1m.Dtos.Course;
using _3w1m.Dtos.Questions;
using _3w1m.Dtos.Student;
using _3w1m.Dtos.Teacher;
using _3w1m.Models.Domain;
using AutoMapper;

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
        CreateMap<CourseDto, CourseMinimalDto>();
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

        CreateMap<CreateAssignmentRequestDto, Assignment>();
        CreateMap<Assignment, AssignmentDto>();
        CreateMap<AssignmentDto, Assignment>();
        CreateMap<UpdateAssignmentRequestDto, Assignment>();
        CreateMap<UpdateAssignmentRequestDto, Assignment>();
        CreateMap<Assignment, AssignmentForStudentDto>();
        CreateMap<AssignmentDto, AssignmentForStudentDto>();
 
        CreateMap<CreateQuestionRequestDto, Question>();
        CreateMap<Question, QuestionDto>();
        CreateMap<QuestionDto, Question>();
        CreateMap<Question, QuestionForStudentDto>()
            .ForMember(dest => dest.Answers, opt => opt.MapFrom(src =>
                src.Type == "Fill In Blank" 
                    ? new List<AnswerForStudentDto>() 
                    : src.Answers.Select(answer => new AnswerForStudentDto
                    {
                        AnswerId = answer.AnswerId,
                        Value = answer.Value
                    }).ToList()));
        CreateMap<Question, QuestionWithStudentAnswerDto>();
        CreateMap<Question, QuestionWithAnswerForStudentDto>();

        CreateMap<QuestionDto, QuestionForStudentDto>()
            .ForMember(dest => dest.Answers, opt => opt.MapFrom(src =>
                src.Type == "Fill In Blank" 
                    ? new List<AnswerForStudentDto>() 
                    : src.Answers.Select(answer => new AnswerForStudentDto
                    {
                        AnswerId = answer.AnswerId,
                        Value = answer.Value
                    }).ToList()));

        CreateMap<CreateAnswerRequestDto, Answer>();
        CreateMap<Answer, AnswerDto>();
        CreateMap<AnswerDto, Answer>();
        CreateMap<Answer, AnswerForStudentDto>();
        CreateMap<AnswerDto, AnswerForStudentDto>();
        CreateMap<StudentAnswer, StudentAnswerDto>();

        CreateMap<AssignmentSubmission, AssignmentSubmissionRequestDto>();
        CreateMap<AssignmentSubmission, AssignmentSubmissionDto>()
            .ForMember(dest => dest.StudentName, opt => opt.MapFrom(src => src.Student.Fullname));
        CreateMap<AssignmentSubmission, AssignmentSubmissionMinimalDto>()
            .ForMember(dest => dest.StudentName, opt => opt.MapFrom(src => src.Student.Fullname));

        CreateMap<AssignmentSubmissionDto, AssignmentSubmission>();
        CreateMap<AssignmentSubmission, AssignmentSubmissionForStudentDto>();
        CreateMap<AssignmentSubmissionDto, AssignmentSubmissionResponseDto>();
        CreateMap<AssignmentSubmissionMinimalDto, AssignmentSubmissionResponseDto>();
    }
}