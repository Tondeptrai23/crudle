using _3w1m.Dtos.Assignment;

namespace _3w1m.Services.Interface;

public interface IAssignmentService
{
    public Task<(int count, IEnumerable<AssignmentDto>)> GetAssignmentsAsync(int courseId,
        AssignmentCollectionQueryDto? assignmentCollectionQueryDto);

    public Task<AssignmentDto> GetAssignmentAsync(int courseId, int assignmentId);

    public Task<AssignmentDto> CreateAssignmentAsync(int courseId,
        CreateAssignmentRequestDto createAssignmentRequestDto);

    public Task<AssignmentSubmissionResponseDto> SubmitAssignmentAsync(int courseId, int assignmentId, AssignmentSubmissionRequestDto assignmentSubmissionRequestDto);

    public Task<bool> DeleteAssignmentAsync(int courseId, int assignmentId);

    public Task<AssignmentDto> UpdateAssignmentAsync(int courseId, int assignmentId,
        UpdateAssignmentRequestDto updateAssignmentRequestDto);

    public Task<AssignmentDto> UpdateAssignmentDescriptionAsync(int courseId, int assignmentId,
        UpdateAssignmentDescriptionRequestDto updateAssignmentDescriptionRequestDto);
}