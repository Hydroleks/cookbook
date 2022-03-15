import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

export default function PostForm(){
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title' />
                <Form.TextArea placeholder='Description' />
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}