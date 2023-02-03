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
        public async Task<AuthResponseDto> Signup(AuthRequestDto authDto) => await _authService.SignUp(authDto);
    }
}
