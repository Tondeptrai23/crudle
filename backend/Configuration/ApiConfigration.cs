using System.Text.Json.Serialization;
using _3w1m.Models.Exceptions;

namespace _3w1m.Configuration;

public static class ApiConfigExtension
{
    public static IServiceCollection AddApiConfig(this IServiceCollection services)
    {
        services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
                options.JsonSerializerOptions.WriteIndented = true;
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            })
            .AddCustomBadRequest(); // Configure custom BadRequest response

        services.AddEndpointsApiExplorer();


        return services;
    }
}