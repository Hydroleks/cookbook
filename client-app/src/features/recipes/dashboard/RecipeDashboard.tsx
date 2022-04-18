import { observer } from 'mobx-react-lite';
import react, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import RecipeList from './RecipeList';

export default observer(function RecipeDashboard() {
    const {recipeStore} = useStore();

    useEffect(() => {
        recipeStore.loadRecipes();
    }, [recipeStore]);

    //console.log(recipeStore.recipesByCreatedDate);

    return (
        <Grid>
            <Grid.Column width='10'>
                <RecipeList />
            </Grid.Column>
        </Grid>
    );
});