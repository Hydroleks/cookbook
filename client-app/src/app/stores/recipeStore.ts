import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Recipe } from "../models/recipe";

export default class RecipeStore {
    recipeRegistry = new Map<string, Recipe>();
    seelectedRecipe: Recipe | undefined = undefined;
    
    constructor() {
        makeAutoObservable(this)
    }

    loadRecipes = async () => {
        try {
            const recipes = await agent.Recipes.list();
            recipes.forEach(recipe => {
                this.recipeRegistry.set(recipe.id, recipe);
            });
        } catch (error) {
            console.log(error);
        }
    }

    get recipesByCreatedDate() {
        return Array.from(this.recipeRegistry.values()).sort((a, b) => Date.parse(b.created) - Date.parse(a.created));
    }
}