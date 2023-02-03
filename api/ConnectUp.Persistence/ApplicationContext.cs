using ConnectUp.Models;
using Microsoft.EntityFrameworkCore;

namespace ConnectUp.Persistence;

public class ApplicationContext : DbContext, IApplicationContext
{
    public ApplicationContext(DbContextOptions options) : base(options) { }

    public override int SaveChanges()
    {
        var entries = ChangeTracker
            .Entries()
            .Where(e => e.Entity is BaseModel && (
                    e.State == EntityState.Added
                    || e.State == EntityState.Modified));

        foreach (var entityEntry in entries)
        {
            ((BaseModel)entityEntry.Entity).UpdatedAt = DateTime.Now;

            if (entityEntry.State == EntityState.Added)
            {
                ((BaseModel)entityEntry.Entity).Uuid = Guid.NewGuid();
                ((BaseModel)entityEntry.Entity).CreatedAt = DateTime.Now;
                ((BaseModel)entityEntry.Entity).IsValid = true;
            }
        }

        return base.SaveChanges();
    }

    public DbSet<User> Users { get; set; }
}
