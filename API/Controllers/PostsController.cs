using API.Controllers;
using Domain;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Posts;

public class PostsController : BaseApiController
{
    private readonly IMediator _mediator;
    public PostsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<Post>>> GetPostsAsync()
    {
        return await _mediator.Send(new List.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Post>> GetPostAsync(Guid id)
    {
        return Ok(); //for now.
    }
}