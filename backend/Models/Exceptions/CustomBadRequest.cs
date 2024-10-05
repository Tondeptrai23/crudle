using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Models.Exceptions;

public class CustomBadRequest : ValidationProblemDetails
{
    public bool Success { get; set; }
    
    public string Error { get; set; }
    
    public CustomBadRequest(ActionContext context) : base(context.ModelState)
    {
        Detail = null;
        Instance = null;
        Status = 400;
        Title = null;
        Type = null;
        Success = false;
        Error = "BadRequestException";
    }
}

public static class CustomBadRequestConfig
{
    public static IMvcBuilder AddCustomBadRequest(this IMvcBuilder builder)
    {
        builder.ConfigureApiBehaviorOptions(options =>
        {
            options.InvalidModelStateResponseFactory = context =>
            {
                var problems = new CustomBadRequest(context);
                
                return new BadRequestObjectResult(problems);
            };
        });
        
        return builder;
    }
}