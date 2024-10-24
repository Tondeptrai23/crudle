using _3w1m.Data;
using _3w1m.Models.Domain;
using Microsoft.AspNetCore.Identity;

namespace _3w1m.Configuration;

public static class IdentityConfigExtension
{
    public static IServiceCollection AddIdentityConfig(this IServiceCollection services)
    {
        services.AddIdentity<User, IdentityRole>(options =>
            {
                // Turn off password requirements
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 1;
                options.Password.RequiredUniqueChars = 0;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders()
            .AddSignInManager<SignInManager<User>>();

        return services;
    }
}