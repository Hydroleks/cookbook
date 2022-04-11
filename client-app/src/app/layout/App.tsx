import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { Post } from '../models/post';
import NavBar from './NavBar';
import PostDashboar from '../../features/posts/dashboard/PostDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {postStore} = useStore();

  useEffect(() => {
    postStore.loadPosts();
  }, [postStore]);

  if(postStore.initialLoading) return <LoadingComponent content='Loading App' />

  return (
    // Fragment groups things together, so we can return 2 things without the use of an empty div.
    // Shortcut version using Fragment is just empty <> as below.
    <> 
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <PostDashboar />
      </Container>
    </>
  );
}

export default observer(App);
