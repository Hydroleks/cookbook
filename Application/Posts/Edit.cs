using Domain;
using MediatR;
using Persistence;

namespace Application.Posts;
public class Edit
{
    public class Command : IRequest
    {
        public Post Post { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _dataContext;

        public Handler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var post = await _dataContext.Posts.FindAsync(request.Post.Id);

            post.Title = request.Post.Title ?? post.Title;

            await _dataContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}