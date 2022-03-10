import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List } from 'semantic-ui-react';
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
    <div>
      <NavBar />
      <List>
        {posts.map(post => (
            <List.Item key={post.id}>
              {post.title}
            </List.Item>
          ))}
      </List>
    </div>
  );
}

export default App;
