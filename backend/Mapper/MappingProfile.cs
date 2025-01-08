using _3w1m.Constants;
using _3w1m.Dtos;
using _3w1m.Dtos.Answers;
using _3w1m.Dtos.Article;
using _3w1m.Dtos.Assignment;
using _3w1m.Dtos.Course;
using _3w1m.Dtos.Exam;
using _3w1m.Dtos.Exam.Student;
using _3w1m.Dtos.Exam.Teacher;
using _3w1m.Dtos.ExamSubmission;
using _3w1m.Dtos.ExamSubmission.Student;
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
                src.Type.Equals(QuestionType.FillInBlank, StringComparison.OrdinalIgnoreCase)
                    ? new List<AnswerForStudentDto>()
                    : src.Answers.Select(answer => new AnswerForStudentDto
                    {
                        QuestionId = answer.QuestionId,
                        AnswerId = answer.AnswerId,
                        Value = answer.Value
                    }).ToList()));
        CreateMap<Question, QuestionWithStudentAnswerDto>();
        CreateMap<Question, QuestionWithAnswerForStudentDto>();

        CreateMap<QuestionDto, QuestionForStudentDto>()
            .ForMember(dest => dest.Answers, opt => opt.MapFrom(src =>
                src.Type.Equals(QuestionType.FillInBlank, StringComparison.OrdinalIgnoreCase)
                    ? new List<AnswerForStudentDto>()
                    : src.Answers.Select(answer => new AnswerForStudentDto
                    {
                        QuestionId = answer.QuestionId,
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

        CreateMap<Exam, ExamDto>()
            .ForMember(dest => dest.NumberOfSubmissions, opt => opt.MapFrom(src => src.Submissions.Count));
        CreateMap<ExamDto, Exam>();
        CreateMap<Exam, ExamMinimalDto>();
        CreateMap<ExamMinimalDto, Exam>();
        CreateMap<CreateExamRequestDto, Exam>()
            .ForMember(dest => dest.ExamQuestions, opt => opt.MapFrom(src => src.Questions));
        CreateMap<UpdateExamRequestDto, Exam>()
            .ForAllMembers(opt =>
                opt.Condition((_, _, srcMember) => srcMember != null));
        CreateMap<UpdateMinimalExamRequestDto, Exam>()
            .ForAllMembers(opt =>
                opt.Condition((_, _, srcMember) => srcMember != null));

        CreateMap<ExamQuestion, ExamQuestionDto>()
            .ForMember(dest => dest.Answers, opt => opt.MapFrom(src => src.ExamAnswers));
        CreateMap<ExamQuestionDto, ExamQuestion>();
        CreateMap<ExamQuestion, ExamQuestionForStudentDto>()
            .ForMember(dest => dest.ExamAnswers, opt => opt.MapFrom(src =>
                src.Type.Equals(QuestionType.FillInBlank, StringComparison.OrdinalIgnoreCase)
                    ? new List<ExamAnswerForStudentDto>()
                    : src.ExamAnswers.Select(answer =>
                        new ExamAnswerForStudentDto
                        {
                            AnswerId = answer.AnswerId,
                            ExamQuestionId = answer.ExamQuestionId,
                            Value = answer.Value
                        }
                    ).ToList()
            ));
        CreateMap<ExamQuestionDto, ExamQuestionForStudentDto>()
            .ForMember(dest => dest.ExamAnswers, opt => opt.MapFrom(src =>
                src.Type.Equals(QuestionType.FillInBlank, StringComparison.OrdinalIgnoreCase)
                    ? new List<ExamAnswerForStudentDto>()
                    : src.Answers.Select(answer =>
                        new ExamAnswerForStudentDto
                        {
                            AnswerId = answer.AnswerId,
                            ExamQuestionId = answer.ExamQuestionId,
                            Value = answer.Value
                        }
                    ).ToList()
            ));

        CreateMap<ExamAnswer, ExamAnswerDto>();
        CreateMap<ExamAnswerDto, ExamAnswer>();
        CreateMap<ExamAnswer, ExamAnswerForStudentDto>();
        CreateMap<ExamAnswerDto, ExamAnswerForStudentDto>();

        CreateMap<CreateExamQuestionRequestDto, ExamQuestion>();
        CreateMap<CreateExamAnswerRequestDto, ExamAnswer>();

        CreateMap<ExamSubmission, ExamSubmissionDto>()
            .ForMember(dest=>dest.StudentName, opt => opt.MapFrom(src => src.Student.Fullname))
            .ForMember(dest => dest.Questions , opt => opt.MapFrom(src => src.Exam.ExamQuestions))
            .ForMember(dest=>dest.ExamDueDate, opt => opt.MapFrom(src => src.Exam.EndDate));
        
        CreateMap<ExamSubmissionDto, ExamSubmission>();
        CreateMap<ExamSubmission, ExamSubmissionResponseDto>()
            .ForMember(dest => dest.StudentName, opt => opt.MapFrom(src => src.Student.Fullname));
        CreateMap<ExamSubmissionRequestDto, ExamSubmission>();
        CreateMap<ExamSubmission, ExamSubmissionRequestDto>()
            .ForAllMembers(opt => opt.Condition(
                (_, _, srcMember) => srcMember != null));
        CreateMap<ExamSubmission, ExamStartResponseDto>()
            .ForMember(dest => dest.Questions, opt => opt.MapFrom(src => src.Exam.ExamQuestions));

        CreateMap<ExamStudentAnswerRequestDto, StudentAnswerExam>()
            .ForMember(dest => dest.ExamQuestionId, opt => opt.MapFrom(src => src.ExamQuestionId));

        CreateMap<Exam, ExamStudentResponseDto>()
            .ForMember(dest => dest.ExamQuestions, opt => opt.MapFrom(src => src.ExamQuestions));

        CreateMap<StudentAnswerExam, ExamStudentAnswerDto>();
        CreateMap<ExamStudentAnswerDto, StudentAnswerExam>()
            .ForAllMembers(opt => opt.Condition(
                (_, _, srcMember) => srcMember != null));

        CreateMap<ExamSubmission, ExamSubmissionMinimalDto>()
            .ForMember(dest => dest.StudentName, opt => opt.MapFrom(src => src.Student.Fullname))
            .ForMember(dest => dest.ExamDueDate, opt => opt.MapFrom(src => src.Exam.EndDate));
        
        CreateMap<ExamSubmission, ExamSubmissionForStudentDto>()
            .ForMember(dest => dest.ExamQuestions, opt => opt.MapFrom(src => src.Exam.ExamQuestions));
        CreateMap<ExamSubmissionDto, ExamSubmissionForStudentDto>()
            .ForMember(dest => dest.ExamQuestions, opt => opt.MapFrom(src => src.Questions));
        CreateMap<ExamQuestion, ExamQuestionWithAnswerForStudentDto>()
            .ForMember(dest => dest.ExamAnswers, opt => opt.MapFrom(src => src.ExamAnswers));
        CreateMap<ExamQuestionDto, ExamQuestionWithAnswerForStudentDto>()
            .ForMember(dest => dest.ExamAnswers, opt => opt.MapFrom(src => src.Answers));
        CreateMap<ExamQuestionWithAnswerDto, ExamQuestionWithAnswerForStudentDto>()
            .ForMember(dest => dest.ExamAnswers, opt => opt.MapFrom(src => src.Answers));
        CreateMap<ExamQuestion, ExamQuestionWithAnswerDto>()
            .ForMember(dest => dest.Answers, opt => opt.MapFrom(src => src.ExamAnswers))
            .ForMember(dest => dest.StudentAnswer, opt => opt.MapFrom(src => src.StudentAnswers));
        CreateMap<ExamAnswer, ExamStudentAnswerDto>();
        CreateMap<ExamStudentAnswerDto, ExamAnswer>();
    }
}