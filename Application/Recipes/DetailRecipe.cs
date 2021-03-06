using Domain;
using MediatR;
using Persistence;

namespace Application.Recipes;
public class DetailRecipe
{
    public class Query : IRequest<Recipe>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Recipe>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Recipe> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Recipes.FindAsync(request.Id);
        }
    }
}