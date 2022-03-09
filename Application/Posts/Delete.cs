using MediatR;
using Persistence;

namespace Application.Posts;
public class Delete
{
    public class Command : IRequest
    {
        public Guid Id { get; set; }
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
            var post = await _dataContext.Posts.FindAsync(request.Id);

            _dataContext.Remove(post);

            await _dataContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}