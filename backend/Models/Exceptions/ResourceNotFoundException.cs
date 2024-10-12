using System.Net;

namespace _3w1m.Models.Exceptions;

public class ResourceNotFoundException : CustomException
{
    public ResourceNotFoundException(string message) : base(message)
    {

    }
    
    public override int GetHttpStatusCode()
    {
        return (int)HttpStatusCode.NotFound;
    }
}