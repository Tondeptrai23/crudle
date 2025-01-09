using _3w1m.Data;
using _3w1m.Dtos.Exam;
using _3w1m.Dtos.Exam.Student;
using _3w1m.Dtos.Exam.Teacher;
using _3w1m.Dtos.ExamSubmission;
using _3w1m.Dtos.ExamSubmission.Student;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace _3w1m.Services.Implementation;

public class ExamService : IExamService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public ExamService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<(int, IEnumerable<ExamMinimalDto>)> GetExamsAsync(int courseId, int teacherId,
        ExamQueryCollectionDto queryDto)
    {
        if (!await _context.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var exams = _context.Exams
            .Where(e => e.CourseId == courseId);

        var total = await exams.CountAsync();
        exams = ApplyFilter(exams, queryDto);
        exams = ApplyOrder(exams, queryDto);
        exams = ApplyPagination(exams, queryDto);

        return (total, _mapper.Map<IEnumerable<ExamMinimalDto>>(await exams.ToListAsync()));
    }

    public async Task<ExamDto> GetDetailExamForTeacherAsync(int courseId, int examId, int teacherId)
    {
        if (!await _context.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var exam = await _context.Exams
            .Include(e => e.Submissions)
            .Include(e => e.Questions)
            .ThenInclude(eq => eq.Answers)
            .FirstOrDefaultAsync(e => e.CourseId == courseId && e.ExamId == examId);

        if (exam == null)
        {
            throw new ResourceNotFoundException("Exam not found");
        }

        return _mapper.Map<ExamDto>(exam);
    }

    public async Task<ExamStudentResponseDto> GetDetailExamForStudentAsync(int courseId, int examId, int studentId)
    {
        if (!await _context.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }
        
        var exam = await _context.Exams
            .Include(e => e.Questions)
            .ThenInclude(eq => eq.Answers)
            .FirstOrDefaultAsync(e => e.CourseId == courseId && e.ExamId == examId);
 
        if (exam == null)
        {
            throw new ResourceNotFoundException("Exam not found");
        }
        
        return _mapper.Map<ExamStudentResponseDto>(exam);
    }

    public async Task<ExamDto> CreateExamAsync(int courseId, int teacherId,
        CreateExamRequestDto createExamRequestDto)
    {
        if (!await _context.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }

        if (await _context.Exams.AnyAsync(e => e.ExamId == createExamRequestDto.ExamId))
        {
            throw new ConflictException("Exam with this id already exists");
        }

        var exam = _mapper.Map<Exam>(createExamRequestDto);

        exam.CourseId = courseId;
        exam.EndDate = createExamRequestDto.StartDate.AddMinutes(createExamRequestDto.Duration);
        exam.CreatedAt = DateTime.Now;
        exam.UpdatedAt = DateTime.Now;

        await _context.Exams.AddAsync(exam);
        await _context.SaveChangesAsync();

        return _mapper.Map<ExamDto>(exam);
    }
    public async Task<ExamDto> ReplaceExamAsync(int courseId, int teacherId, int examId, 
        CreateExamRequestDto replaceExamRequestDto)
    {
        if (!await _context.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }
    
        // Load the existing exam with its related entities
        var existingExam = await _context.Exams
            .Include(e => e.Questions)
                .ThenInclude(q => q.Answers)
            .FirstOrDefaultAsync(e => e.CourseId == courseId && e.ExamId == examId);
    
        if (existingExam == null)
        {
            throw new ResourceNotFoundException("Exam not found");
        }
    
        using var transaction = await _context.Database.BeginTransactionAsync();
        try 
        {
            // Remove existing questions and their answers
            _context.RemoveRange(existingExam.Questions);
    
            // Update the exam properties
            existingExam.Name = replaceExamRequestDto.Name;
            existingExam.Content = replaceExamRequestDto.Content;
            existingExam.StartDate = replaceExamRequestDto.StartDate;
            existingExam.Duration = replaceExamRequestDto.Duration;
            existingExam.EndDate = replaceExamRequestDto.StartDate.AddMinutes(replaceExamRequestDto.Duration);
            existingExam.UpdatedAt = DateTime.Now;
    
            // Add new questions
            existingExam.Questions = replaceExamRequestDto.Questions
                .Select(q => new ExamQuestion
                {
                    Content = q.Content,
                    Type = q.Type,
                    Answers = q.Answers.Select(a => new ExamAnswer
                    {
                        Value = a.Value,
                        IsCorrect = a.IsCorrect
                    }).ToList()
                }).ToList();
    
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            
            return _mapper.Map<ExamDto>(existingExam);
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<ExamMinimalDto> UpdatePartiallyExamAsync(int courseId, int teacherId, int examId,
        UpdateMinimalExamRequestDto updateMinimalExamRequestDto)
    {
        if (!await _context.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var exam = await _context.Exams
            .FirstOrDefaultAsync(e => e.CourseId == courseId && e.ExamId == examId);

        if (exam == null)
        {
            throw new ResourceNotFoundException("Exam not found");
        }

        _mapper.Map(updateMinimalExamRequestDto, exam);
        exam.CourseId = courseId;
        exam.UpdatedAt = DateTime.Now;
        exam.EndDate = exam.StartDate.AddMinutes(exam.Duration);

        _context.Update(exam);
        await _context.SaveChangesAsync();

        return _mapper.Map<ExamDto>(exam);
    }

    public async Task<bool> DeleteExamAsync(int courseId, int examId, int teacherId)
    {
        if (!await _context.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var exam = await _context.Exams
            .FirstOrDefaultAsync(e => e.CourseId == courseId && e.ExamId == examId);

        if (exam == null)
        {
            throw new ResourceNotFoundException("Exam not found");
        }

        _context.Exams.Remove(exam);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<ExamStartResponseDto> StartExamAsync(int courseId, int examId, int studentId)
    {
        if (!await _context.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var exam = await _context.Exams.FirstOrDefaultAsync(e => e.ExamId == examId && e.CourseId == courseId );
        if (exam == null)
        {
            throw new ResourceNotFoundException("Exam not found");
        }
        
        if (exam.EndDate < DateTime.Now)
        {
            throw new ForbiddenException("Exam has already ended");
        }

        if (await _context.ExamSubmissions.AnyAsync(es => es.StudentId == studentId && es.ExamId == examId && es.SubmittedAt != null))
        {
            throw new ForbiddenException("Student has already submitted the exam");
        }
        
        var examSubmission = new ExamSubmission
        {
            StudentId = studentId,
            ExamId = examId,
            StartedAt = DateTime.Now
        };

        await _context.ExamSubmissions.AddAsync(examSubmission);
        await _context.SaveChangesAsync();

        examSubmission = await _context.ExamSubmissions
            .Include(es => es.Exam)
            .ThenInclude(e => e.Questions)
            .ThenInclude(eq => eq.Answers)
            .FirstOrDefaultAsync(es => es.SubmissionId == examSubmission.SubmissionId);
        
        return _mapper.Map<ExamStartResponseDto>(examSubmission);
    }

    public async Task<ExamSubmissionResponseDto> SubmitExamAsync(int courseId, int examId, int studentId,
        ExamSubmissionRequestDto examSubmissionRequestDto)
    {
        if (!await _context.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var exam = await _context.Exams
            .Include(e => e.Questions)
            .ThenInclude(eq => eq.Answers)
            .FirstOrDefaultAsync(e => e.ExamId == examId && e.CourseId == courseId);

        if (exam == null)
        {
            throw new ResourceNotFoundException("Exam not found");
        }
        
        if (exam.EndDate < examSubmissionRequestDto.SubmissionTime)
        {
            throw new ForbiddenException("Exam has already ended");
        }

        var examSubmission = await _context.ExamSubmissions
            .Include(es => es.StudentAnswers)
            .ThenInclude(sa => sa.ExamQuestion)
            .FirstOrDefaultAsync(es => es.SubmissionId == examSubmissionRequestDto.ExamSubmissionId);

        if (examSubmission == null)
        {
            throw new ResourceNotFoundException("Exam submission not found");
        }

        _mapper.Map(examSubmissionRequestDto, examSubmission);

        examSubmission.SubmittedAt = DateTime.Now;
        var answers = examSubmission.StudentAnswers.Select(sa => sa.Value);
        var correctAnswers = exam.Questions.SelectMany(eq => eq.Answers)
            .Where(ea => ea.IsCorrect).Select(ea => ea.Value);

        examSubmission.Score = answers.Count(a => correctAnswers.Contains(a, StringComparer.OrdinalIgnoreCase));

        await _context.SaveChangesAsync();

        return _mapper.Map<ExamSubmissionResponseDto>(examSubmission);
    }

    private IQueryable<Exam> ApplyFilter(IQueryable<Exam> query, ExamQueryCollectionDto queryDto)
    {
        if (!string.IsNullOrWhiteSpace(queryDto.Name))
        {
            query = query.Where(exam => exam.Name.ToLower().Contains(queryDto.Name.ToLower()));
        }

        if (queryDto is { StartDateFrom: not null, StartDateTo: not null })
        {
            query = query.Where(exam =>
                exam.StartDate >= queryDto.StartDateFrom.Value && exam.StartDate <= queryDto.StartDateTo.Value);
        }

        if (queryDto is { EndDateFrom: not null, EndDateTo: not null })
        {
            query = query.Where(exam =>
                exam.EndDate >= queryDto.EndDateFrom.Value && exam.EndDate <= queryDto.EndDateTo.Value);
        }

        if (queryDto is { CreatedAtFrom: not null, CreatedAtTo: not null })
        {
            query = query.Where(exam =>
                exam.CreatedAt >= queryDto.CreatedAtFrom.Value && exam.CreatedAt <= queryDto.CreatedAtTo.Value);
        }

        if (queryDto is { UpdatedAtFrom: not null, UpdatedAtTo: not null })
        {
            query = query.Where(exam =>
                exam.UpdatedAt >= queryDto.UpdatedAtFrom.Value && exam.UpdatedAt <= queryDto.UpdatedAtTo.Value);
        }

        if (queryDto.Duration != null)
        {
            query = query.Where(exam => exam.Duration == queryDto.Duration);
        }

        return query;
    }

    private static IQueryable<Exam> ApplyOrder(IQueryable<Exam> query, ExamQueryCollectionDto queryDto)
    {
        var orderBy = queryDto.OrderBy?.ToLower();
        var orderDirection = queryDto.OrderDirection?.ToLower();
        query = orderBy switch
        {
            "duration" => orderDirection == "desc"
                ? query.OrderByDescending(exam => exam.CourseId)
                : query.OrderBy(exam => exam.CourseId),
            "name" => orderDirection == "desc"
                ? query.OrderByDescending(exam => exam.Name)
                : query.OrderBy(exam => exam.Name),
            "startdate" => orderDirection == "desc"
                ? query.OrderByDescending(exam => exam.StartDate)
                : query.OrderBy(exam => exam.StartDate),
            "enddate" => orderDirection == "desc"
                ? query.OrderByDescending(exam => exam.EndDate)
                : query.OrderBy(exam => exam.EndDate),
            "createdat" => orderDirection == "desc"
                ? query.OrderByDescending(exam => exam.CreatedAt)
                : query.OrderBy(exam => exam.CreatedAt),
            "updatedat" => orderDirection == "desc"
                ? query.OrderByDescending(exam => exam.UpdatedAt)
                : query.OrderBy(exam => exam.UpdatedAt),
            _ => query.OrderBy(exam => exam.Duration)
        };

        return query;
    }

    private IQueryable<Exam> ApplyPagination(IQueryable<Exam> query, ExamQueryCollectionDto queryDto)
    {
        return query.Skip((queryDto.Page - 1) * queryDto.Size)
            .Take(queryDto.Size);
    }
}