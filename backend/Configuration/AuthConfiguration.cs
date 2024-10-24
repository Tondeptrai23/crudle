using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace _3w1m.Configuration;

public static class AuthenticationConfigExtension
{
    public static IServiceCollection AddAuthenticationConfig(this IServiceCollection services)
    {
        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

            })
            .AddJwtBearer(options =>
            {
                var key = Environment.GetEnvironmentVariable("JWT_SECRET_KEY");
                var issuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
                var audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");
                options.UseSecurityTokenValidators = true;

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false, // TODO: https://stackoverflow.com/questions/54395859/c-sharp-asp-net-core-bearer-error-invalid-token
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true, 
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                    RoleClaimType = ClaimTypes.Role,  // Make sure this is set
                    ClockSkew = TimeSpan.Zero  // Reduce clock skew to zero for testing

                };
            });

        return services;
    }
    
}