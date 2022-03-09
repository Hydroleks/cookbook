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

    // No need to use  [FromBody] as the BaseController contains [ApiController] attribute.
    [HttpPost]
    public async Task<IActionResult> CreatePostAsync(Post post)
    {
        return Ok(await Mediator.Send(new Create.Command{ Post = post }));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditPostAsync(Guid id, Post post)
    {
        post.Id = id;
        return Ok(await Mediator.Send(new Edit.Command{ Post = post }));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePostAsync(Guid id)
    {
        return Ok(await Mediator.Send(new Delete.Command{ Id = id }));
    }
}