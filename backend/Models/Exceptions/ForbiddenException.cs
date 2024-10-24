using System.Net;

namespace _3w1m.Models.Exceptions;

public class ForbiddenException : CustomException
{
    public ForbiddenException() : base("Forbidden")
    {
    }
    
    public ForbiddenException(string message) : base(message)
    {
    }
    
    public override int GetHttpStatusCode()
    {
        return (int)HttpStatusCode.Forbidden;
    }
}