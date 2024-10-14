using _3w1m.Models.Exceptions;

namespace _3w1m.Middlewares;
public class ExceptionHandlingMiddleware 
{
    private readonly RequestDelegate _next;
    public ExceptionHandlingMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            await HandleExceptionAsync(context, e);
        }
    }
    
    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = exception.GetHttpStatusCode();
        
        return context.Response.WriteAsync(System.Text.Json.JsonSerializer.Serialize(new
        {
            Success = false,
            Message = exception.Message,
            Status = exception.GetHttpStatusCode(),
            Error = exception.GetType().Name,
        }));
    }
}

public static class ExceptionHandlingMiddlewareExtensions
{
    public static IApplicationBuilder UseExceptionHandlingMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<ExceptionHandlingMiddleware>();
    }
}