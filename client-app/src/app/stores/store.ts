import { createContext, useContext } from "react";
import PostStore from "./postStore";
import RecipeStore from "./recipeStore";

interface Store {
    postStore: PostStore,
    recipeStore: RecipeStore
}

export const store: Store = {
    postStore: new PostStore(),
    recipeStore: new RecipeStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}