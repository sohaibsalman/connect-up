using ConnectUp.Models.Dtos.User;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ConnectUp.Service.Helpers
{
    internal class JwtManager
    {
        public static string GenerateToken(UserDto user)
        {
            var claims = new Claim[] { 
                new (JwtRegisteredClaimNames.Sub, user.Uuid.ToString()),
                new (JwtRegisteredClaimNames.Email, user.Email)
            };

            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes("connect-up-security-key")),
                SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                "issuer", 
                "audience", 
                claims, 
                null, 
                DateTime.UtcNow.AddHours(1), 
                signingCredentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
