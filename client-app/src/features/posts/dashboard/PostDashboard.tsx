import { observer } from 'mobx-react-lite';
import react from 'react';
import { Grid } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';
import { useStore } from '../../../app/stores/store';
import PostDetails from '../details/PostDetails';
import PostForm from '../form/PostForm';
import PostList from './PostList';

interface Props{
    posts: Post[];
    deletePost: (id: string) => void;
    submitting: boolean;
}

export default observer(function PostDashboar({posts, deletePost, submitting}: Props) {
    const {postStore} = useStore();
    const {selectedPost, editMode} = postStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <PostList posts={posts} deletePost={deletePost} submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedPost && !editMode && <PostDetails/>}
                { editMode && 
                <PostForm /> }
            </Grid.Column>
        </Grid>
    );
})