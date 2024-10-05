using System.Net;

namespace _3w1m.Models.Exceptions;

public class CustomException : Exception
{
    public CustomException(string message) : base(message)
    {
    }
    public virtual int GetHttpStatusCode()
    {
        return (int)HttpStatusCode.InternalServerError;
    }
}