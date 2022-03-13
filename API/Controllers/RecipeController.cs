using Application.Recipes;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
public class RecipeController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Recipe>>> GetRecipesAsync(CancellationToken cancellationToken)
    {
        return await Mediator.Send(new ListRecipe.Query(), cancellationToken);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Recipe>> GetRecipeAsync(Guid id, CancellationToken cancellationToken)
    {
        return await Mediator.Send(new DetailRecipe.Query{ Id = id }, cancellationToken);
    }

    [HttpPost]
    public async Task<IActionResult> CreateRecipeAsync(Recipe recipe, CancellationToken cancellationToken)
    {
        return Ok(await Mediator.Send(new CreateRecipe.Command{ Recipe = recipe }, cancellationToken));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditRecipeAsync(Guid id, Recipe recipe, CancellationToken cancellationToken)
    {
        recipe.Id = id;
        return Ok(await Mediator.Send(new EditRecipe.Command{ Recipe = recipe }, cancellationToken));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecipeAsync(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await Mediator.Send(new DeleteRecipe.Command{ Id = id }, cancellationToken));
    }
}