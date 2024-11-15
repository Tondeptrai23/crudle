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

namespace _3w1m.Controllers.Auth;

[Route("api/[controller]")]
[ApiController]
[Tags("Authentication")]
public class AuthController : ControllerBase
{
    private readonly ITokenService _tokenService;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public AuthController(
        ITokenService tokenService,
        UserManager<User> userManager,
        SignInManager<User> signInManager)
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
            throw new UnauthorizedException("User not found.");
        }

        var result = await _signInManager.PasswordSignInAsync(user, loginDto.Password, false, false);
        if (!result.Succeeded)
        {
            throw new UnauthorizedException("Invalid password.");
        }

        var accessToken = await _tokenService.GenerateAccessToken(user);
        var refreshToken = await _tokenService.GenerateRefreshToken(user.Id);
        
        var roles = await _userManager.GetRolesAsync(user);

        return Ok(new ResponseDto<Object>(new
            { AccessToken = accessToken, RefreshToken = refreshToken, UserId = user.Id, Role = roles[0] }));
    }

    [HttpPost]
    [Route("refresh")]
    public async Task<IActionResult> Refresh([FromBody, Required] RefreshTokenDto refreshTokenDto)
    {
        var user = await _userManager.FindByIdAsync(refreshTokenDto.UserId);
        if (user == null || !await _tokenService.ValidateRefreshToken(user.Id, refreshTokenDto.RefreshToken))
        {
            throw new UnauthorizedException("Invalid refresh token.");
        }

        var newAccessToken = await _tokenService.GenerateAccessToken(user);
        return Ok(new ResponseDto<Object>(new { AccessToken = newAccessToken }));
    }
    
    [HttpPost]
    [Route("logout")]
    public async Task<IActionResult> Logout([FromBody, Required] RefreshTokenDto refreshTokenDto)
    {
        var user = await _userManager.FindByIdAsync(refreshTokenDto.UserId);
        if (user == null || !await _tokenService.ValidateRefreshToken(user.Id, refreshTokenDto.RefreshToken))
        {
            throw new UnauthorizedException("Invalid refresh token.");
        }

        await _tokenService.RevokeRefreshToken(user.Id, refreshTokenDto.RefreshToken);
        return Ok(new ResponseDto<string>("Refresh token revoked." ));
    }
}