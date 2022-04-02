import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function PostDetails(){
    const { postStore } = useStore();
    const { selectedPost: post, openForm, cancelSelectedPost } = postStore;

    if(!post) return <LoadingComponent/>

    return (
        <Card fluid>
        <Image src={`/assets/post.png`} />
        <Card.Content>
          <Card.Header>{post.title}</Card.Header>
          <Card.Meta>
            <span>{post.created}</span>
          </Card.Meta>
          <Card.Description>
            {post.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Card.Meta>
            <span>{post.created}</span>
          </Card.Meta>
          <Button.Group widths='2'>
              <Button onClick={() => openForm(post.id)} basic color='blue' content='Edit' />
              <Button onClick={cancelSelectedPost} basic color='grey' content='Cancel' />
          </Button.Group>
        </Card.Content>
      </Card>
    );
}