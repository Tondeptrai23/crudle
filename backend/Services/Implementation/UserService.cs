using System.Diagnostics;
using _3w1m.Models.Domain;
using _3w1m.Services.Interface;
using Microsoft.AspNetCore.Identity;

namespace _3w1m.Services.Implementation;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;

    public UserService(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    
    public async Task<string?> CreateStudentAsync(string email, string password)
    {
        var user = new User
        {
            UserName = email,
            Email = email,
        };
        
        var result = await _userManager.CreateAsync(user, password);
        return result.Succeeded ? user.Id : null;
    }

    public string? FindUserByEmailAsync(string email)
    {
        throw new NotImplementedException();
    }
}