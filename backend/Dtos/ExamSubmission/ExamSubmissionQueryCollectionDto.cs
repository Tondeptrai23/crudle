namespace _3w1m.Dtos.Exam.Student;

public class ExamSubmissionQueryCollectionDto: BaseCollectionQueryDto
{
    public DateTime? StartedFrom { get; set; }
    public DateTime? StartedTo { get; set; }
    public DateTime? SubmittedFrom { get; set; }
    public DateTime? SubmittedTo { get; set; }
    public int? Score { get; set; }
}