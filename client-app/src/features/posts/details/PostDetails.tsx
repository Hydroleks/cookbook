import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';

interface Props{
    post: Post
}

export default function PostDetails({post}: Props){
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
              <Button basic color='grey' content='cancel' />
          </Button.Group>
        </Card.Content>
      </Card>
    );
}