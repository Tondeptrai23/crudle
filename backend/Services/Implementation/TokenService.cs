﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using _3w1m.Data;
using _3w1m.Models.Domain;
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
            expires: DateTime.Now.AddMinutes(jwtExpirationMinutes),
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
                ExpiryDate = _jwtSettings.RefreshTokenExpiredTime,
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