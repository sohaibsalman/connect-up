using ConnectUp.Interface;
using ConnectUp.Models.Dtos.Auth;
using Microsoft.AspNetCore.Mvc;

namespace ConnectUp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("signup")]
        public async Task<AuthResponseDto> Signup(AuthRequestDto authDto) => await _authService.SignUp(authDto);

        [HttpPost]
        [Route("login")]
        public async Task<AuthResponseDto> Login(AuthRequestDto authDto)
        {
            return await _authService.Login(authDto);
        }
    }
}
