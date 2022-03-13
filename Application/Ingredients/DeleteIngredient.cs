using MediatR;
using Persistence;

namespace Application.Ingredients;

public class DeleteIngredient
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
            var ingredient = await _dataContext.Ingredients.FindAsync(request.Id);

            _dataContext.Remove(ingredient);

            await _dataContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}