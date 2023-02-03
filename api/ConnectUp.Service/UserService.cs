using ConnectUp.Interface;
using ConnectUp.Models;
using ConnectUp.Models.Dtos.Auth;
using ConnectUp.Persistence;

namespace ConnectUp.Service;

public class UserService : IUserService
{
    private readonly IApplicationContext _context;

    public UserService(IApplicationContext context)
    {
        _context = context;
    }

    public async Task<AuthDto> CreateUser(SignupDto signupDto)
    {
        User user = new User { Email = signupDto.Email, Password = signupDto.Password };
        await _context.Users.AddAsync(user);
        _context.SaveChanges();

        return new AuthDto { AccessToken = user.Uuid.ToString() };
    }
}
