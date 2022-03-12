using System.ComponentModel.DataAnnotations.Schema;

namespace Domain;

public class RecipeIngredient
{
    [ForeignKey("Recipe")]
    public Guid RecipeId { get; set; }

    [ForeignKey("Ingredient")]
    public Guid IngredientId { get; set; }
}