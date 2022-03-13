using Domain;
using MediatR;
using Persistence;

namespace Application.Recipes;

public class CreateRecipe
{
    public class Command : IRequest
    {
        public Recipe Recipe { get; set; }
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
            request.Recipe.Created = DateTime.Now;
            request.Recipe.Modified = DateTime.Now;

            _dataContext.Recipes.Add(request.Recipe);

            await _dataContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}