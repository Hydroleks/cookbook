import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Post } from '../models/post';
import NavBar from './NavBar';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get<Post[]>("https://localhost:5001/api/Posts").then(response => {
      console.log(response);
      setPosts(response.data);
    });
  }, []);

  return (
    // Fragment groups things together, so we can return 2 things without the use of an empty div.
    // Shortcut version using Fragment is just empty <> as below.
    <> 
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <List>
          {posts.map(post => (
              <List.Item key={post.id}>
                {post.title}
              </List.Item>
            ))}
        </List>
      </Container>
    </>
  );
}

export default App;
