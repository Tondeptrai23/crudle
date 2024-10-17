using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using _3w1m.Data;
using _3w1m.Models.Domain;
using _3w1m.Services.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace _3w1m.Services.Implementation;

public class TokenService : ITokenService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _context;

    public TokenService(UserManager<IdentityUser> userManager, IConfiguration configuration, ApplicationDbContext context)
    {
        _userManager = userManager;
        _configuration = configuration;
        _context = context;
    }

    public async Task<string> GenerateAccessToken(IdentityUser user)
    {
        var userRoles = await _userManager.GetRolesAsync(user);
        var authClaims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET_KEY")));
        var creds = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
        var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
        var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");
        var jwtExpirationMinutes = int.Parse(Environment.GetEnvironmentVariable("JWT_EXPIRATION_MINUTES"));

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            expires: DateTime.Now.AddMinutes(jwtExpirationMinutes),
            claims: authClaims,
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<string> GenerateRefreshToken(string userId)
    {
        var randomNumber = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomNumber);
            var refreshToken = Convert.ToBase64String(randomNumber);

            var refreshTokenEntity = new RefreshToken
            {
                Token = refreshToken,
                UserId = userId,
                ExpiryDate = DateTime.Now.AddDays(int.Parse(Environment.GetEnvironmentVariable("JWT_REFRESH_TOKEN_EXPIRES_IN_DAYS"))),
                IsRevoked = false
            };

            _context.RefreshTokens.Add(refreshTokenEntity);
            await _context.SaveChangesAsync();

            return refreshToken;
        }
    }

    public async Task<bool> ValidateRefreshToken(string userId, string refreshToken)
    {
        var storedToken = await _context.RefreshTokens
            .FirstOrDefaultAsync(rt => rt.UserId == userId && rt.Token == refreshToken && !rt.IsRevoked);
        return storedToken != null && storedToken.ExpiryDate > DateTime.Now;
    }
}