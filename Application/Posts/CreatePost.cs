
using MediatR;
using Persistence;

namespace Application.Posts;

public class CreatePost
{
    public class Command : IRequest
    {
        public Domain.Post Post { get; set; }
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
            request.Post.Created = DateTime.Now;
            request.Post.Modified = DateTime.Now;

            _dataContext.Posts.Add(request.Post);

            await _dataContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
