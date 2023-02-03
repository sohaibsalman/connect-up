using ConnectUp.Interface;
using ConnectUp.Models.Dtos.Auth;
using ConnectUp.Models.Dtos.User;
using ConnectUp.Service.Helpers;

namespace ConnectUp.Service;

public class AuthService : IAuthService
{
    private readonly IUserService _userService;

    public AuthService(IUserService userService)
    {
        _userService = userService;
    }

    public async Task<AuthResponseDto> Login(AuthRequestDto authDto)
    {
        var userInDb = await _userService.FindOne(x => x.Email == authDto.Email);
        if (userInDb is null) throw new Exception("User not found");

        bool isPasswordCorrect = PasswordManager.Verify(userInDb.Password!, authDto.Password);
        if (!isPasswordCorrect) throw new Exception("Invalid Credentials");

        string accessToken = JwtManager.GenerateToken(userInDb);
        return new AuthResponseDto { AccessToken = accessToken };
    }

    public async Task<AuthResponseDto> SignUp(AuthRequestDto authDto)
    {
        var userInDb = await _userService.FindOne(x => x.Email == authDto.Email);
        if (userInDb != null) throw new Exception("User already exists");

        string hashedPassword = PasswordManager.HashPassword(authDto.Password);
        UserDto user = await _userService.CreateUser(authDto.Email, hashedPassword);

        string accessToken = JwtManager.GenerateToken(user);
        return new AuthResponseDto { AccessToken = accessToken };
    }
}
