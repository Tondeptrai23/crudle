using System.Net;

namespace _3w1m.Models.Exceptions;
public class TokenExpiredException : CustomException
{
    public TokenExpiredException() : base("Unauthorized")
    {
    }

    public TokenExpiredException(string message) : base(message)
    {
    }

     public override int GetHttpStatusCode()
    {
        return (int)HttpStatusCode.Forbidden;
    }
}