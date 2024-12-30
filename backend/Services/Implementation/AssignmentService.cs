using _3w1m.Data;
using _3w1m.Dtos.Assignment;
using _3w1m.Dtos.Questions;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using _3w1m.Specifications.Interface;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
            .Include(a => a.Questions)
            .ThenInclude(q => q.Answers)
            .FirstOrDefaultAsync(c => c.AssignmentId == assignmentId
                                      && c.CourseId == courseId);
        if (assignment == null)
        {
            throw new ResourceNotFoundException("Assignment not found");
        }

        // Check if assignment is due
        if (assignment.DueDate < DateTime.Now)
        {
            throw new ResourceNotFoundException("Assignment is due");
        }

        // Check if the student has already started the assignment
        if (assignment.CanRetry == false)
        {
            var existingSubmission = await _dbContext.AssignmentSubmissions
                .FirstOrDefaultAsync(s => s.AssignmentId == assignmentId && s.StudentId == studentId);
            if (existingSubmission != null)
            {
                throw new ResourceNotFoundException("Student is only allowed to start once");
            }
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

    public async Task<AssignmentStartResponseDto> ResumeAssignmentAsync(int submissionId)
    {
        var submission = await _dbContext.AssignmentSubmissions
            .FirstOrDefaultAsync(s => s.SubmissionId == submissionId && s.SubmittedAt == DateTime.MinValue);
        if (submission == null)
        {
            throw new ResourceNotFoundException("Submission not found or already submitted");
        }

        // Verify if the assignment is still available
        var assignment = await _dbContext.Assignments
            .Include(asgmt => asgmt.Questions)
            .ThenInclude(question => question.Answers)
            .FirstOrDefaultAsync(c => c.AssignmentId == submission.AssignmentId);
        if (assignment == null)
        {
            throw new ResourceNotFoundException("Assignment not found");
        }

        // Check if assignment is due
        if (assignment.DueDate < DateTime.Now)
        {
            throw new ResourceNotFoundException("Assignment is due");
        }

        return new AssignmentStartResponseDto
        {
            SubmissionId = submission.SubmissionId,
            AssignmentId = assignment.AssignmentId,
            StartedAt = submission.StartedAt,
            Questions = _mapper.Map<IEnumerable<QuestionForStudentDto>>(assignment.Questions)
        };
    }

    public async Task<AssignmentSubmissionResponseDto> SubmitAssignmentAsync(int courseId, int assignmentId,
        int studentId,
        AssignmentSubmissionRequestDto requestDto)
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

        var submission = await _dbContext.AssignmentSubmissions
            .Include(s => s.Answers)
            .FirstOrDefaultAsync(s => s.SubmissionId == requestDto.SubmissionId && s.StudentId == studentId);
        if (submission == null)
        {
            throw new ResourceNotFoundException("Submission not found");
        }

        if (!submission.Answers.IsNullOrEmpty())
        {
            if (!assignment.CanRetry)
            {
                throw new ForbiddenException("Student is only allowed to submit once");
            }

            throw new ConflictException("Start another submission to submit for this assignment again");
        }

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
                    continue;
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

                if (questionEntity.Answers.Any(a => a.Value.Equals(answer.Value, StringComparison.OrdinalIgnoreCase)))
                {
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

    public async Task<(int count, IEnumerable<UpcomingAssignmentDto>)> GetAssignmentsByStudentId(int studentId, int year, int month)
    {
        var student = await _dbContext.Students
            .Include(s => s.Enrollments)
                .ThenInclude(e => e.Course)
            .FirstOrDefaultAsync(s => s.StudentId == studentId);

        if (student == null)
        {
            throw new ResourceNotFoundException("Student not found");
        }

        var courses = student.Enrollments.Select(e => e.CourseId);

        if (courses == null)
        {
            throw new ResourceNotFoundException("Course not found");
        }

        // Get first and last day of the month
        var firstDayOfMonth = new DateTime(year, month, 1);
        var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

        var assignments = _dbContext.Assignments
            .Include(a => a.Course)
            .Where(a => courses.Contains(a.CourseId) &&
                        a.DueDate >= firstDayOfMonth &&
                        a.DueDate <= lastDayOfMonth);

        var count = await assignments.CountAsync();
        return (count, _mapper.Map<IEnumerable<UpcomingAssignmentDto>>(await assignments.ToListAsync()));
    }
}