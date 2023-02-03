using ConnectUp.Interface;
using ConnectUp.Models;
using ConnectUp.Models.Dtos.User;
using ConnectUp.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ConnectUp.Service;

public class UserService : IUserService
{
    private readonly IApplicationContext _context;

    public UserService(IApplicationContext context)
    {
        _context = context;
    }

    public async Task<UserDto> CreateUser(string email, string password)
    {
        User user = new User { Email = email, Password = password };
        await _context.Users.AddAsync(user);
        _context.SaveChanges();

        return new UserDto { Uuid = user.Uuid, Email = user.Email };
    }

    public async Task<UserDto> FindOne(Expression<Func<User, bool>> filterFunction)
    {
        var user = await _context.Users.SingleOrDefaultAsync(filterFunction);
        if (user is null) return null;

        return new UserDto { Email = user.Email, Uuid = user.Uuid };
    }
}
