using ConnectUp.Models.Dtos.Auth;
using ConnectUp.Models.Dtos.User;

namespace ConnectUp.Interface;

public interface IUserService
{
    Task<AuthDto> CreateUser(SignupDto signupDto);
}
