using ConnectUp.Interface;
using ConnectUp.Models.Dtos.Auth;
using Microsoft.AspNetCore.Mvc;

namespace ConnectUp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<AuthDto> Signup(SignupDto signupDto)
        {
            return await _userService.CreateUser(signupDto);
        }
    }
}
