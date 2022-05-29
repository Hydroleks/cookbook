import { observer } from 'mobx-react-lite';
import react, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import PostList from './PostList';

export default observer(function PostDashboard() {
    const {postStore} = useStore();

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
                <h2>Posts Filters</h2>
            </Grid.Column>
        </Grid>
    );
})