import react, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';
import { useStore } from '../../../app/stores/store';

interface Props{
    posts: Post[];
    deletePost:(id: string) => void;
    submitting: boolean;
}

export default function PostList({posts, deletePost, submitting}: Props) {
    const {postStore} = useStore();
    const [target, setTarget] = useState('');

    function handlePostDelete(event: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(event.currentTarget.name);
        deletePost(id);
    }

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
                                <Button onClick={() => postStore.selectPost(post.id)} floated='right' content='View' color='blue'/>
                                <Button 
                                    name={post.id}
                                    loading={submitting && target === post.id} 
                                    onClick={(clickEvent) => handlePostDelete(clickEvent, post.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red'/>
                                <Label basic content='Post'/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
}