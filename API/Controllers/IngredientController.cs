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
}