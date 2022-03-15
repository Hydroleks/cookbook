import react from 'react';
import { Grid } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';
import PostDetails from '../details/PostDetails';
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
            <Grid.Column width='6'>
                {posts[0] &&
                <PostDetails post={posts[0]} />}
            </Grid.Column>
        </Grid>
    );
}