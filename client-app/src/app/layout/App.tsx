import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import { Post } from '../models/post';

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
      <Header as='h2' icon='users' content='Posts'/>
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
