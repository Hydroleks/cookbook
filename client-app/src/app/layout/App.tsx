import React, { useEffect, useState } from 'react';
import { Container, List } from 'semantic-ui-react';
import { Post } from '../models/post';
import NavBar from './NavBar';
import PostDashboar from '../../features/posts/dashboard/PostDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post|undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Posts.list().then(response => {
      setPosts(response);
      setLoading(false);
    });
  }, []);

  function handleSelectPost(id: string) {
    setSelectedPost(posts.find(post => post.id === id));
  }

  function handleCanelSelectPost(){
    setSelectedPost(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectPost(id) : handleCanelSelectPost();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditPost(post: Post) {
    setSubmitting(true);

    if(post.id) {
      agent.Posts.update(post).then(() => {
        setPosts([...posts.filter(p => p.id !== post.id), post]);
        setEditMode(false);
        setSelectedPost(post);
        setSubmitting(false);
      })
    } else {
      const rightNow = (new Date()).toISOString().slice(0,10);
      post.id = uuid();
      post.created = rightNow;
      post.modified = rightNow;
      console.log(post);
      agent.Posts.create(post).then(() => {
        setPosts([...posts, post]);
        setEditMode(false);
        setSelectedPost(post);
        setSubmitting(false);
      })
    }
  }

  function handleDeletePost(id: string) {
    setPosts([...posts.filter(post => post.id !== id)]);
  }

  if(loading) return <LoadingComponent content='Loading App' />

  return (
    // Fragment groups things together, so we can return 2 things without the use of an empty div.
    // Shortcut version using Fragment is just empty <> as below.
    <> 
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <PostDashboar 
          posts={posts}
          selectedPost={selectedPost}
          selectPost={handleSelectPost}
          cancelSelectPost={handleCanelSelectPost}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditPost}
          deletePost={handleDeletePost}
          submitting={submitting}
          />
      </Container>
    </>
  );
}

export default App;
