using Microsoft.AspNetCore.Identity;

namespace _3w1m.Services.Interface;

public interface IUserService
{
    public Task<string?> CreateStudentAsync(string email, string password);
    
    public string? FindUserByEmailAsync(string email);
}