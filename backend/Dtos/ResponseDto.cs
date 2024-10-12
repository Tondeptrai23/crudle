namespace _3w1m.Dtos;

public class ResponseDto<T>(T data)
    where T : class
{
    public bool Success { get; set; } = true;
    
    public T Data { get; set; } = data;
}