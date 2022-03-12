namespace Domain;

public class Recipe : Post
{
    public string Instructions { get; set; }

    public RecipeCategory Category { get; set; }
}