import { observer } from 'mobx-react-lite';
import react, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import PostDetails from '../details/PostDetails';
import PostForm from '../form/PostForm';
import PostList from './PostList';

export default observer(function PostDashboar() {
    const {postStore} = useStore();
    const {selectedPost, editMode} = postStore;

    useEffect(() => {
      postStore.loadPosts();
    }, [postStore]);
  
    if(postStore.initialLoading) return <LoadingComponent content='Loading App' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <PostList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedPost && !editMode && <PostDetails/>}
                { editMode && 
                <PostForm /> }
            </Grid.Column>
        </Grid>
    );
})