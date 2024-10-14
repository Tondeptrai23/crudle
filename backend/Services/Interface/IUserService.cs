using _3w1m.Models.Exceptions;
using Microsoft.AspNetCore.Identity;

namespace _3w1m.Services.Interface;

/// <summary>
/// Provides services for managing user data.
/// Authentication and authorization will not be covered in this interface.
/// </summary>
public interface IUserService
{
    /// <summary>
    /// Create a new user with the given email and password
    /// </summary>
    /// <param name="email">User's email to be created</param>
    /// <param name="password">User's password to be created</param>
    /// <returns>The UserId of the created user, or null if it cannot be created</returns>
    public Task<string?> CreateUserAsync(string email, string password);
}