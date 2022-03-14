import react from 'react';
import { Grid } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';
import PostList from './PostList';

interface Props{
    posts: Post[];
}

export default function PostDashboar({posts}: Props){
    return (
        <Grid>
            <Grid.Column width='10'>
                <PostList posts={posts}/>
            </Grid.Column>
        </Grid>
    );
}