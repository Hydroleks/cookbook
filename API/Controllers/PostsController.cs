using API.Controllers;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Posts;

public class PostsController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Post>>> GetPostsAsync(CancellationToken cancellationToken)
    {
        return await Mediator.Send(new ListPost.Query(), cancellationToken);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Post>> GetPostAsync(Guid id, CancellationToken cancellationToken)
    {
        return await Mediator.Send(new DetailPost.Query{ Id = id }, cancellationToken);
    }

    // No need to use  [FromBody] as the BaseController contains [ApiController] attribute.
    [HttpPost]
    public async Task<IActionResult> CreatePostAsync(Post post, CancellationToken cancellationToken)
    {
        return Ok(await Mediator.Send(new CreatePost.Command{ Post = post }, cancellationToken));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditPostAsync(Guid id, Post post, CancellationToken cancellationToken)
    {
        post.Id = id;
        return Ok(await Mediator.Send(new EditPost.Command{ Post = post }, cancellationToken));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePostAsync(Guid id, CancellationToken cancellationToken)
    {
        return Ok(await Mediator.Send(new DeletePost.Command{ Id = id }, cancellationToken));
    }
}