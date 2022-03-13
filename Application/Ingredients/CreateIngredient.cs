using Domain;
using MediatR;
using Persistence;

namespace Application.Ingredients;

public class CreateIngredient
{
    public class Command : IRequest
    {
        public Ingredient Ingredient { get; set; }
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
            request.Ingredient.Created = DateTime.Now;
            request.Ingredient.Modified = DateTime.Now;

            _dataContext.Ingredients.Add(request.Ingredient);

            await _dataContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}