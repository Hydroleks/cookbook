using MediatR;
using Persistence;

namespace Application.Recipes;

public class DeleteRecipe
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
            var recipe = await _dataContext.Recipes.FindAsync(request.Id);

            _dataContext.Remove(recipe);

            await _dataContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}