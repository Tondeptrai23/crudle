using System.Net;

namespace _3w1m.Models.Exceptions;

public static class ExceptionExtensions
{
    public static string GetTypeName(this Exception ex)
    {
        return ex.GetType().Name;
    }
    
    public static int GetHttpStatusCode(this Exception ex)
    {
        if (ex is CustomException customException)
        {
            return customException.GetHttpStatusCode();
        }

        return (int)HttpStatusCode.InternalServerError;
    }
}