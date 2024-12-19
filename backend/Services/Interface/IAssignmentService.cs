using _3w1m.Dtos.Assignment;
using _3w1m.Dtos.Questions;
using _3w1m.Specifications.Interface;

namespace _3w1m.Services.Interface;

public interface IAssignmentService
{
    public Task<(int count, IEnumerable<AssignmentDto>)> GetAssignmentsAsync(int courseId,
        IAssignmentSpecification? spec ,
        AssignmentCollectionQueryDto? assignmentCollectionQueryDto);

    public Task<AssignmentDto> GetAssignmentAsync(int courseId, int assignmentId,
        IAssignmentSpecification? spec = null);

    public Task<AssignmentDto> CreateAssignmentAsync(int courseId,
        CreateAssignmentRequestDto createAssignmentRequestDto);

    public Task<AssignmentSubmissionResponseDto> SubmitAssignmentAsync(int courseId, int assignmentId, int studentId, AssignmentSubmissionRequestDto assignmentSubmissionRequestDto);

    public Task<bool> DeleteAssignmentAsync(int courseId, int assignmentId);

    public Task<AssignmentDto> ReplaceAssignmentAsync(int courseId, int assignmentId,
        CreateAssignmentRequestDto updateAssignmentRequestDto);

    public Task<AssignmentDto> UpdateAssignmentDescriptionAsync(int courseId, int assignmentId,
        UpdateAssignmentRequestDto updateAssignmentRequestDto);
    
    public Task<AssignmentStartResponseDto> StartAssignmentAsync(int courseId, int assignmentId, int studentId);
    
    public Task<AssignmentStartResponseDto> ResumeAssignmentAsync(int submissionId);
}