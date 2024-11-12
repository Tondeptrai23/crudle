using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using _3w1m.Data;
using _3w1m.Models.Domain;
using _3w1m.Models.Exceptions;
using _3w1m.Services.Interface;
using _3w1m.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace _3w1m.Services.Implementation;

public class TokenService : ITokenService
{
    private readonly UserManager<User> _userManager;
    private readonly JwtSettings _jwtSettings;
    private readonly ApplicationDbContext _context;

    public TokenService(UserManager<User> userManager, JwtSettings jwtSettings, ApplicationDbContext context)
    {
        _userManager = userManager;
        _jwtSettings = jwtSettings;
        _context = context;
    }

    public async Task<string> GenerateAccessToken(User user)
    {
        var userRoles = await _userManager.GetRolesAsync(user);
        var authClaims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
        var creds = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
        var jwtExpirationMinutes = _jwtSettings.AccessTokenExpiresInMinutes;

        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: authClaims,
            expires: DateTime.UtcNow.AddMinutes(jwtExpirationMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<string> GenerateRefreshToken(string userId)
    {

        using var rng = RandomNumberGenerator.Create();
        using var sha256 = SHA256.Create();

        var randomNumber = new byte[32];

        rng.GetBytes(randomNumber);
        var refreshToken = Convert.ToBase64String(randomNumber);
        var hashedToken = Convert.ToBase64String(
            sha256.ComputeHash(Encoding.UTF8.GetBytes(refreshToken))
        );
        
        var refreshTokenEntity = new RefreshToken
        {
            Token = hashedToken,
            UserId = userId,
            ExpiryDate = DateTime.UtcNow.AddMinutes(_jwtSettings.RefreshTokenExpiresInMinutes),
            IsRevoked = false
        };

        _context.RefreshTokens.Add(refreshTokenEntity);
        await _context.SaveChangesAsync();

        return refreshToken;
    }

    public async Task<bool> ValidateRefreshToken(string userId, string refreshToken)
    {
        var hashedToken = Convert.ToBase64String(
            SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(refreshToken))
        );

        var refreshTokenEntity = await _context.RefreshTokens
            .FirstOrDefaultAsync(rt => rt.Token == hashedToken && rt.UserId == userId && rt.IsRevoked == false);
        
        if (refreshTokenEntity != null && refreshTokenEntity.ExpiryDate < DateTime.UtcNow)
        {
            throw new TokenExpiredException("Refresh has expired");
        }
        
        return refreshTokenEntity != null;
    }
    
    public async Task RevokeRefreshToken(string userId, string refreshToken)
    {
        var hashedToken = Convert.ToBase64String(
            SHA256.Create().ComputeHash(Encoding.UTF8.GetBytes(refreshToken))
        );

        var refreshTokenEntity = await _context.RefreshTokens
            .FirstOrDefaultAsync(rt => rt.Token == hashedToken && rt.UserId == userId && rt.IsRevoked == false);

        if (refreshTokenEntity == null)
        {
            throw new ResourceNotFoundException("Refresh token not found.");
        }

        refreshTokenEntity.IsRevoked = true;
        await _context.SaveChangesAsync();
    }
}