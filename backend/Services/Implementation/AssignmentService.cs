using _3w1m.Data;
using _3w1m.Dtos.Assignment;
using _3w1m.Dtos.Questions;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using _3w1m.Specifications.Interface;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace _3w1m.Services.Implementation;

public class AssignmentService : IAssignmentService
{
    private readonly ApplicationDbContext _dbContext;
    private readonly IMapper _mapper;

    public AssignmentService(ApplicationDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<(int count, IEnumerable<AssignmentDto>)> GetAssignmentsAsync(
        int courseId,
        IAssignmentSpecification spec,
        AssignmentCollectionQueryDto? assignmentCollectionQueryDto)
    {
        assignmentCollectionQueryDto ??= new AssignmentCollectionQueryDto();

        if (!await _dbContext.Courses.AnyAsync(c => c.CourseId == courseId))
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var course = await _dbContext.Courses
            .Include(c => c.Teacher)
            .FirstOrDefaultAsync(c => c.CourseId == courseId);

        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var assignments = spec.Apply(_dbContext.Assignments)
            .Where(asgmt => asgmt.CourseId == courseId);

        assignments = ApplyFilter(assignments, assignmentCollectionQueryDto);
        assignments = ApplyOrder(assignments, assignmentCollectionQueryDto);
        var count = await assignments.CountAsync();
        assignments = ApplyPagination(assignments, assignmentCollectionQueryDto);

        return (count, _mapper.Map<IEnumerable<AssignmentDto>>(await assignments.ToListAsync()));
    }

    public async Task<AssignmentDto> GetAssignmentAsync(int courseId, int assignmentId, IAssignmentSpecification spec)
    {
        var assignment = await spec.Apply(_dbContext.Assignments)
            .FirstOrDefaultAsync(c => c.AssignmentId == assignmentId && c.CourseId == courseId);
        if (assignment == null)
        {
            throw new ResourceNotFoundException("Assignment not found");
        }

        return _mapper.Map<AssignmentDto>(assignment);
    }

    public async Task<AssignmentDto> CreateAssignmentAsync(int courseId,
        CreateAssignmentRequestDto createAssignmentRequestDto)
    {
        ArgumentNullException.ThrowIfNull(createAssignmentRequestDto);

        var course = await _dbContext.Courses.Include(c => c.Assignments)
            .ThenInclude(asgmt => asgmt.Questions).ThenInclude(question => question.Answers)
            .FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var assignment = _mapper.Map<Assignment>(createAssignmentRequestDto);

        assignment.CourseId = courseId;
        await _dbContext.Assignments.AddAsync(assignment);
        await _dbContext.SaveChangesAsync();

        return _mapper.Map<AssignmentDto>(assignment);
    }

    public async Task<bool> DeleteAssignmentAsync(int courseId, int assignmentId)
    {
        var assignment = await _dbContext.Assignments
            .Include(asgmt => asgmt.Questions)
            .ThenInclude(question => question.Answers)
            .FirstOrDefaultAsync(c => c.AssignmentId == assignmentId
                                      && c.CourseId == courseId);   
        if (assignment == null)
        {
            throw new ResourceNotFoundException("Assignment not found");
        }

        _dbContext.Remove(assignment);
        return await _dbContext.SaveChangesAsync() > 0;
    }

    public async Task<AssignmentDto> ReplaceAssignmentAsync(int courseId, int assignmentId,
        CreateAssignmentRequestDto updateAssignmentRequestDto)
    {
        ArgumentNullException.ThrowIfNull(updateAssignmentRequestDto);

        var assignment = await _dbContext.Assignments
            .Include(asgmt => asgmt.Questions)
            .ThenInclude(question => question.Answers)
            .FirstOrDefaultAsync(c => c.AssignmentId == assignmentId
                                      && c.CourseId == courseId);
        if (assignment == null)
        {
            throw new ResourceNotFoundException("Assignment not found");
        }
        using var transaction = await _dbContext.Database.BeginTransactionAsync();
        try
        {
            _dbContext.RemoveRange(assignment.Questions.SelectMany(q => q.Answers));
            _dbContext.RemoveRange(assignment.Questions);

            // Update properties instead of creating new entity
            _mapper.Map(updateAssignmentRequestDto, assignment);
            assignment.UpdatedAt = DateTime.UtcNow;
            
            await _dbContext.SaveChangesAsync();
            await transaction.CommitAsync();
            return _mapper.Map<AssignmentDto>(assignment);
        }
        catch (Exception e)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<AssignmentDto> UpdateAssignmentDescriptionAsync(int courseId, int assignmentId,
        UpdateAssignmentRequestDto updateAssignmentRequestDto)
    {
        ArgumentNullException.ThrowIfNull(updateAssignmentRequestDto);
        var assignment = await _dbContext.Assignments
            .Include(asgmt => asgmt.Questions)
            .ThenInclude(question => question.Answers)
            .FirstOrDefaultAsync(c => c.AssignmentId == assignmentId
                                      && c.CourseId == courseId);

        if (assignment == null)
        {
            throw new ResourceNotFoundException("Assignment not found");
        }

        if (updateAssignmentRequestDto.Name != null)
        {
            assignment.Name = updateAssignmentRequestDto.Name;
        }

        if (updateAssignmentRequestDto.DueDate != null)
        {
            assignment.DueDate = updateAssignmentRequestDto.DueDate.Value;
        }

        assignment.UpdatedAt = DateTime.Now;

        await _dbContext.SaveChangesAsync();
        return _mapper.Map<AssignmentDto>(assignment);
    }

    public async Task<AssignmentStartResponseDto> StartAssignmentAsync(int courseId, int assignmentId, int studentId)
    {
        var assignment = await _dbContext.Assignments
            .FirstOrDefaultAsync(c => c.AssignmentId == assignmentId
                                      && c.CourseId == courseId);
        if (assignment == null)
        {
            throw new ResourceNotFoundException("Assignment not found");
        }
        
        var submission = new AssignmentSubmission
        {
            AssignmentId = assignmentId,
            StudentId = studentId,
            StartedAt = DateTime.Now
        };

        var submissionEntity = (await _dbContext.AssignmentSubmissions.AddAsync(submission)).Entity;

        await _dbContext.SaveChangesAsync();
        
        return new AssignmentStartResponseDto
        {
            SubmissionId = submissionEntity.SubmissionId,
            AssignmentId = assignmentId,
            StartedAt = submissionEntity.StartedAt,
            Questions = _mapper.Map<IEnumerable<QuestionForStudentDto>>(assignment.Questions)
        };
    }
    
     public async Task<AssignmentSubmissionResponseDto> SubmitAssignmentAsync(int courseId, int assignmentId,
        int studentId,
        AssignmentSubmissionRequestDto requestDto)
    {
        var submission = await _dbContext.AssignmentSubmissions
            .FirstOrDefaultAsync(s => s.SubmissionId == requestDto.SubmissionId);
        if (submission == null)
        {
            throw new ResourceNotFoundException("Submission not found");
        }
        
        var assignment = await _dbContext.Assignments
            .Include(asgmt => asgmt.Questions)
            .ThenInclude(question => question.Answers)
            .FirstOrDefaultAsync(c => c.AssignmentId == assignmentId
                                      && c.CourseId == courseId);

        var score = 0;
        var studentAnswers = new List<StudentAnswer>();
        foreach (var answer in requestDto.Answers)
        {
            var questionEntity = assignment.Questions.FirstOrDefault(q => q.QuestionId == answer.QuestionId);
            if (questionEntity == null)
            {
                throw new ResourceNotFoundException("Question not found");
            }

            if (questionEntity.Type == "Multiple Choice")
            {
                var answerInDb = questionEntity.Answers.FirstOrDefault(a =>
                    a.Value == answer.Value && a.QuestionId == answer.QuestionId);
                if (answerInDb == null)
                {
                    throw new ResourceNotFoundException("Answer not found");
                }

                studentAnswers.Add(new StudentAnswer
                {
                    SubmissionId = submission.SubmissionId,
                    QuestionId = answer.QuestionId,
                    Value = answer.Value
                });

                if (answerInDb.IsCorrect)
                {
                    score++;
                }
            }
            else if (questionEntity.Type == "Fill In Blank")
            {
                studentAnswers.Add(new StudentAnswer
                {
                    SubmissionId = submission.SubmissionId,
                    QuestionId = answer.QuestionId,
                    Value = answer.Value
                });
                
                if (questionEntity.Answers.Any(a => a.Value.Equals(answer.Value, StringComparison.OrdinalIgnoreCase)))                {
                    score++;
                }
            }
        }

        submission.Score = score;
        submission.Answers = studentAnswers;
        submission.SubmittedAt = DateTime.Now;

        await _dbContext.SaveChangesAsync();

        var assignmentSubmission = new AssignmentSubmissionResponseDto
        {
            SubmissionId = submission.SubmissionId,
            Name = assignment.Name,
            Score = assignment.CanViewScore ? score : null,
            SubmittedAt = DateTime.Now
        };

        return assignmentSubmission;
    }

    private IQueryable<Assignment> ApplyFilter(IQueryable<Assignment> query, AssignmentCollectionQueryDto queryDto)
    {
        if (queryDto.Name != null)
        {
            query = query.Where(asgmt => asgmt.Name.Contains(queryDto.Name));
        }

        if (queryDto.DueDate != null)
        {
            query = query.Where(asgmt => asgmt.DueDate == queryDto.DueDate);
        }

        return query;
    }

    private IQueryable<Assignment> ApplyOrder(IQueryable<Assignment> query, AssignmentCollectionQueryDto queryDto)
    {
        if (queryDto.OrderBy != null)
        {
            query = queryDto.OrderBy switch
            {
                "name" => query.OrderBy(asgmt => asgmt.Name),
                "dueDate" => query.OrderBy(asgmt => asgmt.DueDate),
                _ => query
            };
        }

        return query;
    }

    private IQueryable<Assignment> ApplyPagination(IQueryable<Assignment> query, AssignmentCollectionQueryDto queryDto)
    {
        if (queryDto is { Page: > 0, Size: > 0 })
        {
            query = query.Skip((queryDto.Page - 1) * queryDto.Size).Take(queryDto.Size);
        }

        return query;
    }
}