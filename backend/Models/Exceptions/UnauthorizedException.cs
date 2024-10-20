using System.Net;

namespace _3w1m.Models.Exceptions;

public class UnauthorizedExcpetion : CustomException
{
    public UnauthorizedExcpetion() : base("Unauthorized")
    {
    }

    public UnauthorizedExcpetion(string message) : base(message)
    {
    }


    public override int GetHttpStatusCode()
    {
        return (int)HttpStatusCode.Unauthorized;
    }
}