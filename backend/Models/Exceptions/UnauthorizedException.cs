using System.Net;

namespace _3w1m.Models.Exceptions;

public class UnauthorizedException : CustomException
{
    public UnauthorizedException() : base("Unauthorized")
    {
    }

    public UnauthorizedException(string message) : base(message)
    {
    }


    public override int GetHttpStatusCode()
    {
        return (int)HttpStatusCode.Unauthorized;
    }
}