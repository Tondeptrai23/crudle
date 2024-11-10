using _3w1m.Models.Domain;
using _3w1m.Services.Implementation;
using _3w1m.Services.Interface;
using _3w1m.Settings;

namespace _3w1m.Configuration;

public static class AppServicesConfigExtension
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<ICourseService, CourseService>();
        services.AddScoped<IStudentService, StudentService>();
        services.AddScoped<ITeacherService, TeacherService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IArticleService, ArticleService>();
        services.AddSingleton(new JwtSettings().ReadFromEnvironment());

        return services;
    }
}