using System.Net;

namespace _3w1m.Models.Exceptions;

public class ConflictException : CustomException
{
    public ConflictException(string message) : base(message)
    {
    }

    public override int GetHttpStatusCode()
    {
        return (int)HttpStatusCode.Conflict;
    }
}