using Domain;
using MediatR;
using Persistence;

namespace Application.Ingredients;
public class DetailIngredient
{
    public class Query : IRequest<Ingredient>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Ingredient>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Ingredient> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Ingredients.FindAsync(request.Id);
        }
    }
}