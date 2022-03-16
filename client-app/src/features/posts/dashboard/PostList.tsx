import react from 'React';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';

interface Props{
    posts: Post[];
    selectPost:(id: string) => void;
}

export default function PostList({posts, selectPost}: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {posts.map(post => (
                    <Item key={post.id}>
                        <Item.Content>
                            <Item.Header as='a'>{post.title}</Item.Header>
                            <Item.Meta>{post.created}</Item.Meta>
                            <Item.Description>{post.description}</Item.Description>
                            <Item.Meta>{post.modified}</Item.Meta>
                            <Item.Extra>
                                <Button onClick={() => selectPost(post.id)} floated='right' content='View' color='blue'/>
                                <Label basic content='Post'/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
}