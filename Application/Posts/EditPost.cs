using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Posts;
public class EditPost
{
    public class Command : IRequest
    {
        public Post Post { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public Handler(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var post = await _dataContext.Posts.FindAsync(request.Post.Id);

            post.Modified = DateTime.Now;

            _mapper.Map(request.Post, post);

            await _dataContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}