using _3w1m.Dtos;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using _3w1m.Models.Domain;

namespace _3w1m.Controllers;
using _3w1m.Services;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly ITokenService _tokenService;
    private readonly UserManager<_3w1m.Models.Domain.User> _userManager;
    private readonly SignInManager<_3w1m.Models.Domain.User> _signInManager;

    public AuthController(
        ITokenService tokenService,
        UserManager<_3w1m.Models.Domain.User> userManager,
        SignInManager<_3w1m.Models.Domain.User> signInManager)
    {
        _tokenService = tokenService;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        // if (loginDto == null || string.IsNullOrEmpty(loginDto.Username) || string.IsNullOrEmpty(loginDto.Password))
        // {
        //     // return BadRequest("Invalid login request.");
        //     throw new 
        // }

        var user = await _userManager.FindByNameAsync(loginDto.Username);
        if (user == null)
        {
            return Unauthorized();
        }

        var result = await _signInManager.PasswordSignInAsync(user, loginDto.Password, false, false);
        if (!result.Succeeded)
        {
            return Unauthorized();
        }

        var accessToken = await _tokenService.GenerateAccessToken(user);
        var refreshToken = await _tokenService.GenerateRefreshToken(user.Id);


        return Ok(new { AccessToken = accessToken, RefreshToken = refreshToken });
    }

    [HttpPost]
    [Route("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshTokenDto refreshTokenDto)
    {
        var user = await _userManager.FindByIdAsync(refreshTokenDto.UserId);
        if (user == null || !await _tokenService.ValidateRefreshToken(user.Id, refreshTokenDto.RefreshToken))
        {
            return Unauthorized();
        }

        var newAccessToken = await _tokenService.GenerateAccessToken(user);
        return Ok(new { AccessToken = newAccessToken });
    }

    [HttpPost("create-test-user")]
    public async Task<IActionResult> CreateTestUser()
    {
        var user = new _3w1m.Models.Domain.User()
        {
            UserName = "testuser",
            Email = "testuser@example.com"
        };

        var result = await _userManager.CreateAsync(user, "Test@123");

        if (result.Succeeded)
        {
            return Ok("User created successfully.");
        }
        else
        {
            return BadRequest(result.Errors);
        }
    }
}