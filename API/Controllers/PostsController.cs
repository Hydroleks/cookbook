using API.Controllers;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Posts;

public class PostsController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Post>>> GetPostsAsync()
    {
        return await Mediator.Send(new List.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Post>> GetPostAsync(Guid id)
    {
        return await Mediator.Send(new Detail.Query{ Id = id });
    }
}