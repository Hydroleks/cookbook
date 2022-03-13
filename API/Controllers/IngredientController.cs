using Application.Ingredients;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
public class IngredientController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Ingredient>>> GetIngredientsAsync(CancellationToken cancellationToken)
    {
        return await Mediator.Send(new ListIngredient.Query(), cancellationToken);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Ingredient>> GetIngredientAsync(Guid id, CancellationToken cancellationToken)
    {
        return await Mediator.Send(new DetailIngredient.Query{ Id = id }, cancellationToken);
    }

    [HttpPost]
    public async Task<IActionResult> CreateIngredientAsync(Ingredient ingredient, CancellationToken cancellationToken)
    {
        return Ok(await Mediator.Send(new CreateIngredient.Command{ Ingredient = ingredient }, cancellationToken));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditIngredientAsync(Guid id, Ingredient ingredient, CancellationToken cancellationToken)
    {
        ingredient.Id = id;
        return Ok(await Mediator.Send(new EditIngredient.Command{ Ingredient = ingredient }, cancellationToken));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteIngredientAsync(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await Mediator.Send(new DeleteIngredient.Command{ Id = id }, cancellationToken));
    }
}