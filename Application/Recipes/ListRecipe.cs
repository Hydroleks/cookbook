using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Recipes;

public class ListRecipe
{
    public class Query : IRequest<List<Recipe>> {}

    public class Handler : IRequestHandler<Query, List<Recipe>>
    {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Recipe>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Recipes.ToListAsync(cancellationToken);
        }
    }
}