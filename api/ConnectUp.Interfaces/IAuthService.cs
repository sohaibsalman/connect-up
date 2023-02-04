using ConnectUp.Models.Dtos.Auth;

namespace ConnectUp.Interface;

public interface IAuthService
{
    Task<AuthResponseDto> SignUp(AuthRequestDto authDto);
    Task<AuthResponseDto> Login(AuthRequestDto authDto);
}