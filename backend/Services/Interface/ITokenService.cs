using _3w1m.Models.Domain;
using Microsoft.AspNetCore.Identity;

namespace _3w1m.Services.Interface;

/// <summary>
/// Interface for TokenService
/// </summary>
public interface ITokenService
{
    /// <summary>
    /// Generates an access token for the specified user.
    /// </summary>
    /// <param name="user">The user for whom the access token is generated.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the generated access token as a string.</returns>
    Task<string> GenerateAccessToken(User user);

    /// <summary>
    /// Generates a refresh token for the specified user.
    /// </summary>
    /// <param name="userId">The user for whom the refresh token is generated.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the generated refresh token as a string.</returns>
    Task<string> GenerateRefreshToken(string userId);

    /// <summary>
    /// Validates the specified refresh token for the given user.
    /// </summary>
    /// <param name="userId">The ID of the user to whom the refresh token belongs.</param>
    /// <param name="refreshToken">The refresh token to validate.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains a boolean value indicating whether the refresh token is valid.</returns>
    Task<bool> ValidateRefreshToken(string userId, string refreshToken);
}