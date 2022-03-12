using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Post, Post>();
        CreateMap<Ingredient, Ingredient>();
        CreateMap<Recipe, Recipe>();
    }
}