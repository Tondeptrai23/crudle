namespace _3w1m.Dtos.Exam;

public class ExamQueryCollectionDto : BaseCollectionQueryDto
{
    public string? Name { get; set; }

    public int? Duration { get; set; }

    public DateTime? StartDateFrom { get; set; }
    public DateTime? StartDateTo { get; set; }

    public DateTime? EndDateFrom { get; set; }
    public DateTime? EndDateTo { get; set; }

    public DateTime? CreatedAtFrom { get; set; }
    public DateTime? CreatedAtTo { get; set; }

    public DateTime? UpdatedAtFrom { get; set; }
    public DateTime? UpdatedAtTo { get; set; }
}