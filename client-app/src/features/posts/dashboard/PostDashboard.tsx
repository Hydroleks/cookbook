import react from 'react';
import { Grid } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';
import PostDetails from '../details/PostDetails';
import PostForm from '../form/PostForm';
import PostList from './PostList';

interface Props{
    posts: Post[];
    selectedPost: Post | undefined;
    selectPost: (id: string) => void;
    cancelSelectPost: () => void;
}

export default function PostDashboar({posts, selectedPost, selectPost, cancelSelectPost}: Props){
    return (
        <Grid>
            <Grid.Column width='10'>
                <PostList posts={posts} selectPost={selectPost}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedPost &&
                <PostDetails post={selectedPost} cancelSelectPost={cancelSelectPost}/>}
                <PostForm />
            </Grid.Column>
        </Grid>
    );
}