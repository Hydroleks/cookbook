using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Ingredients;

public class ListIngredient
{
    public class Query : IRequest<List<Ingredient>> {}

    public class Handler : IRequestHandler<Query, List<Ingredient>>
    {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Ingredient>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Ingredients.ToListAsync(cancellationToken);
        }
    }
}