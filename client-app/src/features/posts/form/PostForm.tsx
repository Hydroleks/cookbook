import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default function PostForm() {
    const { postStore } = useStore();
    const { selectedPost, closeForm, createPost, updatePost, loading } = postStore;

    const initialState = selectedPost ?? {
        id: '',
        title: '',
        description: '',
        created: '',
        modified: ''
    }

    const [post, setPost] = useState(initialState);

    function handleSubmit() {
        post.id ? updatePost(post) : createPost(post);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setPost({...post, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={post.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={post.description} name='description' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}