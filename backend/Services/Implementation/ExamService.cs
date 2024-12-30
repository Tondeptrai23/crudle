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

    public async Task<ExamDto> CreateExamAsync(int courseId, int teacherId, int examId,
        CreateExamRequestDto createExamRequestDto)
    {
        if (!await _context.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var exam = _mapper.Map<Exam>(createExamRequestDto);
        exam.ExamId = examId;
        exam.CourseId = courseId;

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
            .FirstOrDefaultAsync(e => e.CourseId == courseId && e.ExamId == examId);

        if (exam == null)
        {
            throw new ResourceNotFoundException("Exam not found");
        }

        _mapper.Map(updateExamRequestDto, exam );
        
        exam.CourseId = courseId;
        exam.UpdatedAt = DateTime.Now;
        
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

        exam = _mapper.Map<Exam>(updateMinimalExamRequestDto);
        exam.CourseId = courseId;

        _context.Update(exam);
        await _context.SaveChangesAsync();

        return _mapper.Map<ExamDto>(exam);
    }

    public Task<GeneralDeleteResponseDto> DeleteExamAsync(int courseId, int examId, int teacherId)
    {
        throw new NotImplementedException();
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