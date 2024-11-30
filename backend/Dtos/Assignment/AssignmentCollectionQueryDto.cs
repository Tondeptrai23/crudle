namespace _3w1m.Dtos.Assignment;

public class AssignmentCollectionQueryDto : BaseCollectionQueryDto
{
    public string? Name { get; set; }
    public DateTime? DueDate { get; set; }
}