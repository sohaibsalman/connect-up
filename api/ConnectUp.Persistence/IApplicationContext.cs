using ConnectUp.Models;
using Microsoft.EntityFrameworkCore;

namespace ConnectUp.Persistence;

public interface IApplicationContext
{
    int SaveChanges();

    DbSet<User> Users { get; set; }
}
