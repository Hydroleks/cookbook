import { RecipeCategory } from "./enums";

export interface Recipe {
    id: string;
    title: string;
    description: string;
    created: string;
    modified: string;
    instructions: string;
    category: RecipeCategory;
}