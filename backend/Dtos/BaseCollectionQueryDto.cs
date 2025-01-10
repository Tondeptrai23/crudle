namespace _3w1m.Dtos;

public class BaseCollectionQueryDto
{
    public int Page { get; set; } = 1;

    public int Size { get; set; } = 5;

    public string? OrderBy { get; set; }

    public string? OrderDirection { get; set; } = "asc";
}