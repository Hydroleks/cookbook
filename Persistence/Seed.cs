using Domain;

namespace Persistence;
public class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if(context.Posts.Any()) return;

        var posts = new List<Post>
        {
            new Post
            {
                Title = "First post",
                Description = "This is the very first post."
            },
            new Post
            {
                Title = "Second post",
                Description = "This second post sounds like the first post."
            },
            new Post
            {
                Title = "Cookbook?",
                Description = "A cook book without recipes? This is strange. Must create recipes."
            },
            new Post
            {
                Title = "Recipes include ingredients",
                Description = "Mixing the right ingredients is ctitical to a yummy meal."
            },
            new Post
            {
                Title = "Health meals",
                Description = "Recipes come in varieties, just like the ingredients."
            }
        };

        await context.Posts.AddRangeAsync(posts);
        await context.SaveChangesAsync();
    }
}