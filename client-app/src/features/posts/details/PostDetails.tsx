import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function PostDetails(){
    const { postStore } = useStore();
    const { selectedPost: post, loadPost, initialLoading } = postStore;
    const { id } = useParams<{id: string}>();

    useEffect(() => {
      if(id) loadPost(id);
    }, [id, loadPost]);

    if(initialLoading || !post) return <LoadingComponent/>

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
              <Button basic color='grey' content='Cancel' />
          </Button.Group>
        </Card.Content>
      </Card>
    );
})