import { observer } from 'mobx-react-lite';
import react from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function RecipeList() {
    const {recipeStore} = useStore();
    const {recipesByCreatedDate} = recipeStore;

    console.log(recipeStore.recipesByCreatedDate);

    return (
        <Segment>
            <Item.Group divided>
                {recipesByCreatedDate.map(recipe => (
                    <Item key={recipe.id}>
                        <Item.Content>
                            <Item.Header as='a'>{recipe.title}</Item.Header>
                            <Item.Meta>Created: {recipe.created}</Item.Meta>
                            <Item.Description>{recipe.description}</Item.Description>
                            <Item.Meta>Modified: {recipe.created}</Item.Meta>
                            <Item.Extra>
                                <Button floated='right' content='View' color='blue'/>
                                <Button floated='right' content='Delete' color='red'/>
                                {/* Probably wont have a delete button maybe upvote and downvote buttons */}
                                <Label basic content={recipe.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
});