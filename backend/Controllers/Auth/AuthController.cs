using _3w1m.Dtos;
using _3w1m.Services.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using _3w1m.Models.Domain;
using _3w1m.Services;
using Microsoft.AspNetCore.Authorization;
using _3w1m.Dtos.Auth;
using System.ComponentModel.DataAnnotations;
using _3w1m.Models.Exceptions;

namespace _3w1m.Controllers;

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
    public async Task<IActionResult> Login([FromBody, Required] LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.Username);
        if (user == null)
        {
            throw new UnauthorizedExcpetion();
        }

        var result = await _signInManager.PasswordSignInAsync(user, loginDto.Password, false, false);
        if (!result.Succeeded)
        {
            throw new UnauthorizedExcpetion();
        }

        var accessToken = await _tokenService.GenerateAccessToken(user);
        var refreshToken = await _tokenService.GenerateRefreshToken(user.Id);


        return Ok(new ResponseDto<Object>(new { AccessToken = accessToken, RefreshToken = refreshToken }));
    }

    [HttpPost]
    [Route("refresh")]
    public async Task<IActionResult> Refresh([FromBody, Required] RefreshTokenDto refreshTokenDto)
    {
        var user = await _userManager.FindByIdAsync(refreshTokenDto.UserId);
        if (user == null || !await _tokenService.ValidateRefreshToken(user.Id, refreshTokenDto.RefreshToken))
        {
            throw new UnauthorizedExcpetion();
        }

        var newAccessToken = await _tokenService.GenerateAccessToken(user);
        return Ok(new ResponseDto<Object>(new { AccessToken = newAccessToken }));
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
}