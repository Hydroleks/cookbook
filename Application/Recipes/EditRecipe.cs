using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Recipes;

public class EditRecipe
{
    public class Command : IRequest
    {
        public Recipe Recipe { get; set; }
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
            var recipe = await _dataContext.Recipes.FindAsync(request.Recipe.Id);

            recipe.Modified = DateTime.Now;

            _mapper.Map(request.Recipe, recipe);

            await _dataContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}