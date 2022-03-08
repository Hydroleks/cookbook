using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    private IMediator? _mediator;

    // Child classes have access to Mediator.
    // If _mediator is null then we request a new IMediator service and assign to _mediator.
    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
}