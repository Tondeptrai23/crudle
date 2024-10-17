using Microsoft.AspNetCore.Identity;

namespace _3w1m.Models.Domain;

public class RefreshToken
{
    public int Id { get; set; }
    public string Token { get; set; }
    public string UserId { get; set; }
    public DateTime ExpiryDate { get; set; }
    public bool IsRevoked { get; set; }

    public User User { get; set; }
}
