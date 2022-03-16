import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';

interface Props{
    post: Post;
    cancelSelectPost:() => void;
}

export default function PostDetails({post, cancelSelectPost}: Props){
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
              <Button basic color='blue' content='Edit' />
              <Button onClick={cancelSelectPost} basic color='grey' content='Cancel' />
          </Button.Group>
        </Card.Content>
      </Card>
    );
}