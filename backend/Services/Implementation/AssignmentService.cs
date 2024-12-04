using _3w1m.Data;
using _3w1m.Dtos.Assignment;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
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

        var assignments = _dbContext.Assignments.Include(asgmt => asgmt.Questions).ThenInclude(q => q.Answers)
            .AsQueryable();

        assignments = ApplyFilter(assignments, assignmentCollectionQueryDto);
        assignments = ApplyOrder(assignments, assignmentCollectionQueryDto);
        var count = await assignments.CountAsync();
        assignments = ApplyPagination(assignments, assignmentCollectionQueryDto);

        return (count, _mapper.Map<IEnumerable<AssignmentDto>>(await assignments.ToListAsync()));
    }

    public async Task<AssignmentDto> GetAssignmentAsync(int courseId, int assignmentId)
    {
        var course = await _dbContext.Courses.Include(c => c.Assignments)
            .ThenInclude(asgmt => asgmt.Questions).ThenInclude(question => question.Answers)
            .FirstOrDefaultAsync(c => c.CourseId == courseId);

        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var assignment = course.Assignments.AsQueryable()
            .FirstOrDefaultAsync(asgmt => asgmt.AssignmentId == assignmentId);
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

    public async Task<AssignmentSubmissionResponseDto> SubmitAssignmentAsync(int courseId, int assignmentId,
        int studentId,
        AssignmentSubmissionRequestDto requestDto)
    {
        var assignment = await _dbContext.Assignments.Include(a => a.Questions)
            .ThenInclude(q => q.Answers)
            .FirstOrDefaultAsync(c => c.AssignmentId == assignmentId    
                                      && c.CourseId == courseId);
        if (assignment == null)
        {
            throw new ResourceNotFoundException("Assignment not found");
        }

        var score = 0;
        var submittedAt = DateTime.Now;

        await using var transaction = await _dbContext.Database.BeginTransactionAsync();
        try
        {
            var submission = (await _dbContext.AssignmentSubmissions.AddAsync(new AssignmentSubmission
            {
                AssignmentId = assignmentId,
                StudentId = studentId,
                SubmittedAt = submittedAt
            })).Entity;
            
            // Save changes to get the submission id
            await _dbContext.SaveChangesAsync();
            
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

                    _dbContext.StudentAnswers.Add(new StudentAnswer
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
            }
            
            submission.Score = score;

            await _dbContext.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch (Exception e)
        {
            await transaction.RollbackAsync();
            throw;
        }

        var assignmentSubmission = new AssignmentSubmissionResponseDto
        {
            AssignmentName = assignment.Name,
            Score = score,
            SubmittedAt = DateTime.Now
        };

        return assignmentSubmission;
    }

    public async Task<bool> DeleteAssignmentAsync(int courseId, int assignmentId)
    {
        var course = await _dbContext.Courses.Include(c => c.Assignments)
            .ThenInclude(asgmt => asgmt.Questions).ThenInclude(question => question.Answers)
            .FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var assignment = await course.Assignments.AsQueryable()
            .FirstOrDefaultAsync(asgmt => asgmt.AssignmentId == assignmentId);
        if (assignment == null)
        {
            throw new ResourceNotFoundException("Assignment not found");
        }

        _dbContext.Remove(assignment);
        return await _dbContext.SaveChangesAsync() > 0;
    }

    public async Task<AssignmentDto> UpdateAssignmentAsync(int courseId, int assignmentId,
        UpdateAssignmentRequestDto updateAssignmentRequestDto)
    {
        ArgumentNullException.ThrowIfNull(updateAssignmentRequestDto);

        var course = await _dbContext.Courses.Include(c => c.Assignments)
            .ThenInclude(asgmt => asgmt.Questions).ThenInclude(question => question.Answers)
            .FirstOrDefaultAsync(c => c.CourseId == courseId);
        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var assignment = await course.Assignments.AsQueryable()
            .FirstOrDefaultAsync(asgmt => asgmt.AssignmentId == assignmentId);
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

        if (updateAssignmentRequestDto.Questions != null)
        {
            assignment.Questions = _mapper.Map<ICollection<Question>>(updateAssignmentRequestDto.Questions);
        }

        assignment.UpdatedAt = DateTime.Now;

        await _dbContext.SaveChangesAsync();
        return _mapper.Map<AssignmentDto>(assignment);
    }

    public async Task<AssignmentDto> UpdateAssignmentDescriptionAsync(int courseId, int assignmentId,
        UpdateAssignmentDescriptionRequestDto updateAssignmentDescriptionRequestDto)
    {
        ArgumentNullException.ThrowIfNull(updateAssignmentDescriptionRequestDto);

        var course = await _dbContext.Courses.Include(c => c.Assignments)
            .ThenInclude(asgmt => asgmt.Questions).ThenInclude(question => question.Answers)
            .FirstOrDefaultAsync(c => c.CourseId == courseId);

        if (course == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        var assignment = await course.Assignments.AsQueryable()
            .FirstOrDefaultAsync(asgmt => asgmt.AssignmentId == assignmentId);
        if (assignment == null)
        {
            throw new ResourceNotFoundException("Assignment not found");
        }

        if (updateAssignmentDescriptionRequestDto.Name != null)
        {
            assignment.Name = updateAssignmentDescriptionRequestDto.Name;
        }

        if (updateAssignmentDescriptionRequestDto.DueDate != null)
        {
            assignment.DueDate = updateAssignmentDescriptionRequestDto.DueDate.Value;
        }

        assignment.UpdatedAt = DateTime.Now;

        await _dbContext.SaveChangesAsync();
        return _mapper.Map<AssignmentDto>(assignment);
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