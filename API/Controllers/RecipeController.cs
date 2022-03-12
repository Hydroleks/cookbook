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
}