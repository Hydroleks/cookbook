using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;
public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Post> Posts { get; set; }

    public DbSet<Recipe> Recipes { get; set; }

    public DbSet<Ingredient> Ingredients { get; set; }

    public DbSet<RecipeIngredient> RecipeIngredients { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Ingredient>().HasBaseType((Type)null).HasKey(i => new { i.Id });
        modelBuilder.Entity<Recipe>().HasBaseType((Type)null).HasKey(r => new { r.Id });
        modelBuilder.Entity<RecipeIngredient>().HasKey(ri => new { ri.RecipeId, ri.IngredientId });
    }
}
