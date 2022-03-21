import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Post } from '../models/post';
import NavBar from './NavBar';
import PostDashboar from '../../features/posts/dashboard/PostDashboard';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post|undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Post[]>("https://localhost:5001/api/Posts").then(response => {
      console.log(response);
      setPosts(response.data);
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
          />
      </Container>
    </>
  );
}

export default App;
