using _3w1m.Dtos;
using _3w1m.Models.Domain;
using _3w1m.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace _3w1m.Controllers.Auth;

/// <summary>
/// For testing purposes only.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class TestAuthController : ControllerBase
{
    private readonly ITokenService _tokenService;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public TestAuthController(
        ITokenService tokenService,
        UserManager<User> userManager,
        SignInManager<User> signInManager)
    {
        _tokenService = tokenService;
        _userManager = userManager;
        _signInManager = signInManager;
    }
    
    
    [HttpPost("create-test-user")]
    public async Task<IActionResult> CreateTestUser()
    {
        
        var user = new User()
        {
            UserName = "testuser",
            Email = "testuser@example.com"
        };

        var result = await _userManager.CreateAsync(user, "Test@123");

        if (result.Succeeded)
        {
            return Ok(new ResponseDto<string>("User created successfully."));
        }
        else
        {
            return BadRequest(result.Errors);
        }
    }

    [HttpPost("check-token")]
    [Authorize]
    public IActionResult CheckToken()
    {
        return Ok(new ResponseDto<string>("Token is valid."));
    }

    [HttpPost]
    [Route("login/Admin")]
    public async Task<IActionResult> Login()
    {
        var user = await _userManager.FindByNameAsync("admin");

        var accessToken = await _tokenService.GenerateAccessToken(user);
        var refreshToken = await _tokenService.GenerateRefreshToken(user.Id);
        
        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new ResponseDto<Object>(new
            { AccessToken = accessToken, RefreshToken = refreshToken, UserId = user.Id, Role = roles[0] }));
    }
    
    [HttpPost]
    [Route("login/Student")]
    public async Task<IActionResult> LoginStudent()
    {
        var user = await _userManager.FindByNameAsync("user2");

        var accessToken = await _tokenService.GenerateAccessToken(user);
        var refreshToken = await _tokenService.GenerateRefreshToken(user.Id);
        
        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new ResponseDto<Object>(new
            { AccessToken = accessToken, RefreshToken = refreshToken, UserId = user.Id, Role = roles[0] }));
    }
    
    [HttpPost]
    [Route("login/Teacher")]
    public async Task<IActionResult> LoginTeacher()
    {
        var user = await _userManager.FindByNameAsync("user1");

        var accessToken = await _tokenService.GenerateAccessToken(user);
        var refreshToken = await _tokenService.GenerateRefreshToken(user.Id);
        
        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new ResponseDto<Object>(new
            { AccessToken = accessToken, RefreshToken = refreshToken, UserId = user.Id, Role = roles[0] }));
    }
}