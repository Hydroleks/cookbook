using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Ingredients;

public class EditIngredient
{
    public class Command : IRequest
    {
        public Ingredient Ingredient { get; set; }
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
            var ingredient = await _dataContext.Ingredients.FindAsync(request.Ingredient.Id);

            ingredient.Modified = DateTime.Now;

            _mapper.Map(request.Ingredient, ingredient);

            await _dataContext.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}