using System.Diagnostics;
using _3w1m.Data;
using _3w1m.Dtos;
using _3w1m.Dtos.Course;
using _3w1m.Dtos.Exam;
using _3w1m.Dtos.Exam.Student;
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
            .Include(e => e.ExamQuestions)
            .ThenInclude(eq => eq.ExamAnswers)
            .FirstOrDefaultAsync(e => e.CourseId == courseId && e.ExamId == examId);

        if (exam == null)
        {
            throw new ResourceNotFoundException("Exam not found");
        }

        return _mapper.Map<ExamDto>(exam);
    }

    public Task<ExamDto> GetDetailExamForStudentAsync(int courseId, int examId, int studentId)
    {
        throw new NotImplementedException();
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
        exam.CreatedAt = DateTime.Now;
        exam.UpdatedAt = DateTime.Now;

        await _context.Exams.AddAsync(exam);
        await _context.SaveChangesAsync();

        return _mapper.Map<ExamDto>(exam);
    }

    public async Task<ExamDto> UpdateExamAsync(int courseId, int teacherId, int examId,
        UpdateExamRequestDto updateExamRequestDto)
    {
        if (!await _context.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var exam = await _context.Exams
            .Include(e => e.ExamQuestions)
            .ThenInclude(eq => eq.ExamAnswers)
            .FirstOrDefaultAsync(e => e.CourseId == courseId && e.ExamId == examId);

        if (exam == null)
        {
            throw new ResourceNotFoundException("Exam not found");
        }

        if (updateExamRequestDto.Name != null)
        {
            exam.Name = updateExamRequestDto.Name;
        }

        if (updateExamRequestDto.StartDate != null)
        {
            exam.StartDate = updateExamRequestDto.StartDate.Value;
        }

        if (updateExamRequestDto.EndDate != null)
        {
            exam.EndDate = updateExamRequestDto.EndDate.Value;
        }

        if (updateExamRequestDto.Duration != null)
        {
            exam.Duration = updateExamRequestDto.Duration.Value;
        }

        if (updateExamRequestDto.ExamQuestions != null)
        {
            foreach (var questionDto in updateExamRequestDto.ExamQuestions)
            {
                if (exam.ExamQuestions.Any(q => q.ExamQuestionId == questionDto.ExamQuestionId))
                {
                    // Update actions 
                    var question = exam.ExamQuestions.First(q => q.ExamQuestionId == questionDto.ExamQuestionId);
                    question.Content = questionDto.Content;
                    question.Type = questionDto.Type;
                    if (!questionDto.ExamAnswers.IsNullOrEmpty())
                    {
                        // Handle add new or update existing answers
                        foreach (var answerDto in questionDto.ExamAnswers)
                        {
                            if (question.ExamAnswers.Any(a => a.AnswerId == answerDto.AnswerId))
                            {
                                var answer = question.ExamAnswers.First(a => a.AnswerId == answerDto.AnswerId);
                                answer.Value = answerDto.Value;
                                answer.IsCorrect = answerDto.IsCorrect;
                            }
                            else
                            {
                                question.ExamAnswers.Add(new ExamAnswer
                                {
                                    Value = answerDto.Value,
                                    IsCorrect = answerDto.IsCorrect
                                });
                            }
                        }
                    }
                }
                else
                {
                    var newQuestion = new ExamQuestion
                    {
                        ExamId = examId,
                        Content = questionDto.Content,
                        Type = questionDto.Type,
                        ExamAnswers = questionDto.ExamAnswers.Select(a => new ExamAnswer
                        {
                            Value = a.Value,
                            IsCorrect = a.IsCorrect
                        }).ToList()
                    };
                    exam.ExamQuestions.Add(newQuestion);
                }
            }
        }

        await _context.SaveChangesAsync();

        return _mapper.Map<ExamDto>(exam);
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