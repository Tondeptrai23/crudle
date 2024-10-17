using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace _3w1m.Models.Domain;

public class User : IdentityUser
{
    public List<RefreshToken> RefreshTokens { get; set; }
}