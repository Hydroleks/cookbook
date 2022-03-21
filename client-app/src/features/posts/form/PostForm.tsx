import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';

interface Props{
    post: Post | undefined;
    closeForm: () => void;
}

export default function PostForm({post, closeForm}: Props){
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' />
                <Form.TextArea placeholder='Description' />
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}