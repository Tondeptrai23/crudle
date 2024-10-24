using _3w1m.Data;
using Microsoft.EntityFrameworkCore;


namespace _3w1m.Configuration;

public static class DatabaseConfigExtension
{
    public static IServiceCollection AddDatabaseConfig(this IServiceCollection services)
    {
        var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        });
        
        return services;
    }
}