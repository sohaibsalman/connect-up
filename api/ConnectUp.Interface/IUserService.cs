using ConnectUp.Models;
using ConnectUp.Models.Dtos.User;
using System.Linq.Expressions;

namespace ConnectUp.Interface;

public interface IUserService
{
    Task<UserDto> CreateUser(string email, string password);
    Task<UserDto> FindOne(Expression<Func<User, bool>> filterFunction);
}
