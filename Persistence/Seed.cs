using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence;
public class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if(!context.Ingredients.Any())
        {
            var ingredients = new List<Ingredient>
            {
                new Ingredient
                {
                    Title = "Carrot",
                    Description = "Ornage stick root.",
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                },
                new Ingredient
                {
                    Title = "Tomato",
                    Description = "Red an round.",
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                },
                new Ingredient
                {
                    Title = "Apple",
                    Description = "Round and fruity",
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                },
                new Ingredient
                {
                    Title = "Sausage",
                    Description = "This one has ingredients of its own. I haven't thought this far yet.",
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                }
            };
            await context.Ingredients.AddRangeAsync(ingredients);

            await context.SaveChangesAsync();
        }

        if(!context.Recipes.Any())
        {
            var recipes = new List<Recipe>
            {
                new Recipe
                {
                    Title = "Strange Salad",
                    Description = "This is a strange salad I would never make.",
                    Instructions = "Instructions could probably be implemented better. Cut up a carrot. Cut up tomato. Mix sliced applesd and tomato. Got a strange salad.",
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                },
                new Recipe
                {
                    Title = "Sliced Apple",
                    Description = "Title is pretty self explanitory.",
                    Instructions = "Cut an apple in to slices.",
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                },
                new Recipe
                {
                    Title = "Sausage",
                    Description = "Store bough sausage.",
                    Instructions = "To make a sausage one must break down the ingredients of it into further components. I have yet to implement that",
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                }
            };

            await context.Recipes.AddRangeAsync(recipes);

            await context.SaveChangesAsync();
        }

        if(!context.RecipeIngredients.Any())
        {
            var strangeSaladId = (await context.Recipes.Where(r => r.Title == "Strange Salad").AsNoTracking().ToListAsync()).FirstOrDefault().Id;
            var slicedAppleId = (await context.Recipes.Where(r => r.Title == "Sliced Apple").AsNoTracking().ToListAsync()).FirstOrDefault().Id;
            var sausageId = (await context.Recipes.Where(r => r.Title == "Sausage").AsNoTracking().ToListAsync()).FirstOrDefault().Id;

            var carrotId = (await context.Ingredients.Where(i => i.Title == "Carrot").AsNoTracking().ToListAsync()).FirstOrDefault().Id;
            var tomatoId = (await context.Ingredients.Where(i => i.Title == "Tomato").AsNoTracking().ToListAsync()).FirstOrDefault().Id;
            var appleId = (await context.Ingredients.Where(i => i.Title == "Apple").AsNoTracking().ToListAsync()).FirstOrDefault().Id;
            var sausageIngredientId = (await context.Ingredients.Where(i => i.Title == "Sausage").AsNoTracking().ToListAsync()).FirstOrDefault().Id;

            var recipeIngredients = new List<RecipeIngredient>
            {
                new RecipeIngredient
                {
                    RecipeId = strangeSaladId,
                    IngredientId = carrotId,
                },
                new RecipeIngredient
                {
                    RecipeId = strangeSaladId,
                    IngredientId = tomatoId,
                },
                new RecipeIngredient
                {
                    RecipeId = slicedAppleId,
                    IngredientId = appleId,
                },
                new RecipeIngredient
                {
                    RecipeId = sausageId,
                    IngredientId = sausageIngredientId,
                },
            };

            await context.RecipeIngredients.AddRangeAsync(recipeIngredients);

            await context.SaveChangesAsync();
        }

        if(!context.Posts.Any())
        {
            var posts = new List<Post>
            {
                new Post
                {
                    Title = "First post",
                    Description = "This is the very first post.",
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                },
                new Post
                {
                    Title = "Second post",
                    Description = "This second post sounds like the first post.",
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                },
                new Post
                {
                    Title = "Cookbook?",
                    Description = "A cook book without recipes? This is strange. Must create recipes.",
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                },
                new Post
                {
                    Title = "Recipes include ingredients",
                    Description = "Mixing the right ingredients is ctitical to a yummy meal.",
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                },
                new Post
                {
                    Title = "Health meals",
                    Description = "Recipes come in varieties, just like the ingredients.",
                    Created = DateTime.Now,
                    Modified = DateTime.Now
                }
            };
            await context.Posts.AddRangeAsync(posts);

            await context.SaveChangesAsync();
        }
    }
}