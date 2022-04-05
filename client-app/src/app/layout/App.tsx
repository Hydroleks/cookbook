import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Post } from '../models/post';
import NavBar from './NavBar';
import PostDashboar from '../../features/posts/dashboard/PostDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {postStore} = useStore();

  const [posts, setPosts] = useState<Post[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    postStore.loadPosts();
  }, [postStore]);

  function handleDeletePost(id: string) {
    setSubmitting(true);
    agent.Posts.delete(id).then(() => {
      setPosts([...posts.filter(post => post.id !== id)]);
      setSubmitting(false);
    })
  }

  if(postStore.initialLoading) return <LoadingComponent content='Loading App' />

  return (
    // Fragment groups things together, so we can return 2 things without the use of an empty div.
    // Shortcut version using Fragment is just empty <> as below.
    <> 
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <PostDashboar 
          posts={postStore.posts}
          deletePost={handleDeletePost}
          submitting={submitting}
          />
      </Container>
    </>
  );
}

export default observer(App);
