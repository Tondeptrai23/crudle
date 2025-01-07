using _3w1m.Data;
using _3w1m.Dtos.Exam.Student;
using _3w1m.Dtos.ExamSubmission;
using _3w1m.Dtos.ExamSubmission.Student;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace _3w1m.Services.Implementation;

public class ExamSubmissionService: IExamSubmissionService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public ExamSubmissionService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<(int , ICollection<ExamSubmissionMinimalDto>)> GetExamSubmissionsAsync(int courseId, int examId, ExamSubmissionQueryCollection queryCollection)
    {
        if (!await _context.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }
        
        if (!await _context.Exams.AnyAsync(e => e.ExamId == examId))
        {
            throw new ResourceNotFoundException("Exam not found");
        }
        
        var query = _context.ExamSubmissions
            .Include(es => es.Student)
            .Where(es => es.ExamId == examId);
        
        query = ApplyFilter(query, queryCollection);
        query = ApplyOrder(query, queryCollection);
        query = ApplyPagination(query, queryCollection);
        
        var examSubmissions = await query.ToListAsync();
        var examSubmissionDtos = _mapper.Map<ICollection<ExamSubmissionMinimalDto>>(examSubmissions);
        
        return (await query.CountAsync(), examSubmissionDtos);
    }

    public async Task<ExamSubmissionDto> GetDetailExamSubmissionTeacherAsync(int courseId, int examId, int studentId, int examSubmissionId)
    {
        if (!await _context.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }
        
        if (!await _context.Exams.AnyAsync(e => e.ExamId == examId))
        {
            throw new ResourceNotFoundException("Exam not found");
        }
        
        var examSubmission = await _context.ExamSubmissions
            .Include(es => es.Student)
            .Include(es => es.StudentAnswers)
            .ThenInclude(sq => sq.ExamQuestion)
            .FirstOrDefaultAsync(es => es.ExamId == examId && es.StudentId == studentId && es.SubmissionId == examSubmissionId);

        if (examSubmission == null)
        {
            throw new ResourceNotFoundException("Exam submission not found");
        }
        
        var examSubmissionDto = _mapper.Map<ExamSubmissionDto>(examSubmission);
        return examSubmissionDto;
    }

    public async Task<(int, ICollection<ExamSubmissionMinimalDto>)> GetExamSubmissionsHistoryAsync(int courseId, int examId, int studentId,
        ExamSubmissionQueryCollection queryCollection)
    {
        if (!await _context.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }
        
        if (!await _context.Exams.AnyAsync(e => e.ExamId == examId))
        {
            throw new ResourceNotFoundException("Exam not found");
        }
        
        var examSubmission = _context.ExamSubmissions
            .Where(es => es.StudentId == studentId && es.ExamId == examId);
            
        examSubmission = ApplyFilter(examSubmission, queryCollection);
        examSubmission = ApplyOrder(examSubmission, queryCollection);
        examSubmission = ApplyPagination(examSubmission, queryCollection);
        
        var examSubmissionDtos = _mapper.Map<ICollection<ExamSubmissionMinimalDto>>(examSubmission);
        return (await examSubmission.CountAsync(), examSubmissionDtos);
    }

    public async Task<ExamSubmissionForStudentDto> GetDetailExamSubmissionStudentAsync(int courseId, int examId, int studentId, int examSubmissionId)
    {
        if (!await _context.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }
        
        if (!await _context.Exams.AnyAsync(e => e.ExamId == examId))
        {
            throw new ResourceNotFoundException("Exam not found");
        }
        
        var examSubmission = await _context.ExamSubmissions
            .Include(es => es.Student)
            .Include(es => es.StudentAnswers)
            .ThenInclude(sq => sq.ExamQuestion)
            .FirstOrDefaultAsync(es => es.ExamId == examId && es.StudentId == studentId && es.SubmissionId == examSubmissionId);

        if (examSubmission == null)
        {
            throw new ResourceNotFoundException("Exam submission not found");
        }
        
        var examSubmissionDto = _mapper.Map<ExamSubmissionForStudentDto>(examSubmission);
        return examSubmissionDto;
    }


    private IQueryable<ExamSubmission> ApplyFilter(IQueryable<ExamSubmission> query, ExamSubmissionQueryCollection queryDto)
    {
        if (queryDto is { StartedFrom: not null, StartedTo: not null })
        {
            query = query.Where(es =>
                es.StartedAt >= queryDto.StartedFrom.Value && es.StartedAt <= queryDto.StartedTo.Value);
        }

        if (queryDto is { SubmittedFrom: not null, SubmittedTo: not null })
        {
            query = query.Where(es => es.SubmittedAt >= queryDto.SubmittedFrom.Value && es.SubmittedAt <= queryDto.SubmittedTo.Value);
        }

        if (queryDto.Score != null)
        {
            query = query.Where(es => es.Score == queryDto.Score);
        }

        return query;
    }

    private static IQueryable<ExamSubmission> ApplyOrder(IQueryable<ExamSubmission> query, ExamSubmissionQueryCollection queryDto)
    {
        var orderBy = queryDto.OrderBy?.ToLower();
        var orderDirection = queryDto.OrderDirection?.ToLower();
        query = orderBy switch
        {
            "startedat" => orderDirection == "desc"
                ? query.OrderByDescending(es => es.StartedAt)
                : query.OrderBy(es => es.StartedAt),
            "submittedat" => orderDirection == "desc"
                ? query.OrderByDescending(es => es.SubmittedAt)
                : query.OrderBy(es => es.SubmittedAt),
            "score" => orderDirection == "desc"
                ? query.OrderByDescending(es => es.Score)
                : query.OrderBy(es => es.Score),
            _ => query.OrderBy(es => es.Score)
        };

        return query;
    }

    private IQueryable<ExamSubmission> ApplyPagination(IQueryable<ExamSubmission> query, ExamSubmissionQueryCollection queryDto)
    {
        return query.Skip((queryDto.Page - 1) * queryDto.Size)
            .Take(queryDto.Size);
    }
}