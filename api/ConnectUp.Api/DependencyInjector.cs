using ConnectUp.Interface;
using ConnectUp.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ConnectUp.Api;

public static class DependencyInjector
{
    public static IServiceCollection RegisterServiceDependencies(this IServiceCollection services)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt => opt.TokenValidationParameters = new()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = "issuer",
                ValidAudience = "audience",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("security-key"))
            });
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IAuthService, AuthService>();

        return services;
    }
}