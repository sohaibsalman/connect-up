using ConnectUp.Interface;
using ConnectUp.Service;

namespace ConnectUp.Api;

public static class DependencyInjector
{
    public static IServiceCollection RegisterServiceDependencies(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();

        return services;
    }
}