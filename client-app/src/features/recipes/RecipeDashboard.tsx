import react, { useEffect } from 'react';
import { useStore } from '../../app/stores/store';

export default function RecipeDashboard() {
    const {recipeStore} = useStore();

    useEffect(() => {
        recipeStore.loadRecipes();
    }, [recipeStore]);

    console.log(recipeStore.recipeRegistry);

    return (
        <h2>Recipe Store! - please check console for now.</h2>
    );
}