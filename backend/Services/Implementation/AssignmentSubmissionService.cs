using _3w1m.Data;
using _3w1m.Dtos.Assignment;
using _3w1m.Dtos.Questions;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace _3w1m.Services.Implementation;

public class AssignmentSubmissionService : IAssignmentSubmissionService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IMapper _mapper;

    public AssignmentSubmissionService(ApplicationDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<AssignmentSubmissionDto> GetDetailSubmissionForTeacherAsync(int courseId, int assignmentId,
        int submissionId, int teacherId)
    {
        if (!await _dbContext.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }

        if (!await _dbContext.Assignments.AnyAsync(a => a.AssignmentId == assignmentId))
        {
            throw new ResourceNotFoundException("Assignment not found");
        }

        var questions = _dbContext.Questions
            .Include(q => q.Answers)
            .Include(q => q.StudentAnswers.Where(sa => sa.SubmissionId == submissionId))
            .Where(q => q.AssignmentId == assignmentId).ToList();

        var questionWithStudentAnswers = _mapper.Map<ICollection<QuestionWithStudentAnswerDto>>(questions);

        var submission = _dbContext.AssignmentSubmissions.Include(s => s.Student).Include(s => s.Answers)
            .FirstOrDefault(s => s.SubmissionId == submissionId && s.AssignmentId == assignmentId);

        if (submission == null)
        {
            throw new ResourceNotFoundException("Submission not found");
        }

        var submissionDto = _mapper.Map<AssignmentSubmissionDto>(submission);
        submissionDto.QuestionWithStudentAnswer = questionWithStudentAnswers;

        return submissionDto;
    }

    public async Task<AssignmentSubmissionDto> GetDetailSubmissionForStudentAsync(int courseId,
        int assignmentId, int submissionId, int studentId)
    {
        if (!await _dbContext.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }

        if (!await _dbContext.Assignments.AnyAsync(a => a.AssignmentId == assignmentId))
        {
            throw new ResourceNotFoundException("Assignment not found");
        }

        var questions = _dbContext.Questions
            .Include(q => q.Answers)
            .Include(q =>
                q.StudentAnswers.Where(sa => sa.SubmissionId == submissionId))
            .Where(q => q.AssignmentId == assignmentId).ToList();
        var questionWithStudentAnswers = _mapper.Map<ICollection<QuestionWithStudentAnswerDto>>(questions);

        var submissions = _dbContext.AssignmentSubmissions
            .Include(s => s.Student)
            .Include(s => s.Assignment)
            .Include(s => s.Answers)
            .Where(s => s.AssignmentId == assignmentId);

        if (!await submissions.AnyAsync(s => s.SubmissionId == submissionId && s.StudentId == studentId))
        {
            throw new ResourceNotFoundException("Submission not found");
        }

        var submission =
            await submissions.FirstOrDefaultAsync(s => s.SubmissionId == submissionId && s.StudentId == studentId);

        var submissionDto = _mapper.Map<AssignmentSubmissionDto>(submission);
        submissionDto.QuestionWithStudentAnswer = questionWithStudentAnswers;

        return submissionDto;
    }

    public async Task<(int, IEnumerable<AssignmentSubmissionMinimalDto>)> GetSubmissionsAsync(int courseId,
        int assignmentId, int teacherId, AssignmentSubmissionCollectionQueryDto? queryDto)
    {
        queryDto ??= new AssignmentSubmissionCollectionQueryDto();
        if (!await _dbContext.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }

        if (!await _dbContext.Assignments.AnyAsync(asgmt => asgmt.AssignmentId == assignmentId))
        {
            throw new ResourceNotFoundException("Assignment not found");
        }

        var submissions = _dbContext.AssignmentSubmissions
            .Include(s => s.Answers)
            .Include(s => s.Student)
            .Where(s => s.AssignmentId == assignmentId)
            .AsQueryable();

        submissions = ApplyFilter(submissions, queryDto);
        submissions = ApplySort(submissions, queryDto);
        submissions = ApplyPagination(submissions, queryDto);

        var count = submissions.Count();

        return (count, _mapper.Map<IEnumerable<AssignmentSubmissionMinimalDto>>(await submissions.ToListAsync()));
    }

    public async Task<(int, IEnumerable<AssignmentSubmissionMinimalDto>)> GetSubmissionsHistoryAsync(int courseId,
        int assignmentId, int studentId, AssignmentSubmissionCollectionQueryDto? queryDto)
    {
        queryDto ??= new AssignmentSubmissionCollectionQueryDto();
        if (!await _dbContext.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }

        if (!await _dbContext.Assignments.AnyAsync(asgmt => asgmt.AssignmentId == assignmentId))
        {
            throw new ResourceNotFoundException("Assignment not found");
        }

        var submissions = _dbContext.AssignmentSubmissions
            .Include(s => s.Student)
            .Where(s => s.AssignmentId == assignmentId && s.StudentId == studentId)
            .AsQueryable();

        submissions = ApplyFilter(submissions, queryDto);
        submissions = ApplySort(submissions, queryDto);
        submissions = ApplyPagination(submissions, queryDto);

        var count = submissions.Count();

        return (count, _mapper.Map<IEnumerable<AssignmentSubmissionMinimalDto>>(submissions));
    }

    private IQueryable<AssignmentSubmission> ApplyPagination(IQueryable<AssignmentSubmission> query,
        AssignmentSubmissionCollectionQueryDto queryDto)
    {
        if (queryDto.Page > 0 && queryDto.Size > 0)
        {
            query = query.Skip((queryDto.Page - 1) * queryDto.Size).Take(queryDto.Size);
        }

        return query;
    }

    private IQueryable<AssignmentSubmission> ApplyFilter(IQueryable<AssignmentSubmission> query,
        AssignmentSubmissionCollectionQueryDto queryDto)
    {
        if (queryDto.Score != null)
        {
            query = query.Where(s => s.Score == queryDto.Score);
        }

        if (queryDto is { StartedAtFrom: not null, StartedAtTo: not null })
        {
            query = query.Where(s => s.StartedAt >= queryDto.StartedAtFrom && s.StartedAt <= queryDto.StartedAtTo);
        }

        if (queryDto is { SubmittedAtFrom: not null, SubmittedAtTo: not null })
        {
            query = query.Where(s =>
                s.SubmittedAt >= queryDto.SubmittedAtFrom && s.SubmittedAt <= queryDto.SubmittedAtTo);
        }

        return query;
    }

    private IQueryable<AssignmentSubmission> ApplySort(IQueryable<AssignmentSubmission> query,
        AssignmentSubmissionCollectionQueryDto queryDto)
    {
        var orderBy = queryDto.OrderBy?.ToLower();
        var orderDirection = queryDto.OrderDirection?.ToLower();
        query = orderBy switch
        {
            "score" => orderDirection switch
            {
                "asc" => query.OrderBy(s => s.Score),
                "desc" => query.OrderByDescending(s => s.Score),
                _ => query
            },
            "startedat" => orderDirection switch
            {
                "asc" => query.OrderBy(s => s.StartedAt),
                "desc" => query.OrderByDescending(s => s.StartedAt),
                _ => query
            },
            "submittedat" => orderDirection switch
            {
                "asc" => query.OrderBy(s => s.SubmittedAt),
                "desc" => query.OrderByDescending(s => s.SubmittedAt),
                _ => query
            },
            _ => query
        };

        return query;
    }
}