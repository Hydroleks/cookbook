import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';
import { useStore } from '../../../app/stores/store';

interface Props{
    createOrEdit: (post: Post) => void;
    submitting: boolean;
}

export default function PostForm({createOrEdit, submitting}: Props) {
    const { postStore } = useStore();
    const { selectedPost, closeForm } = postStore;

    const initialState = selectedPost ?? {
        id: '',
        title: '',
        description: '',
        created: '',
        modified: ''
    }

    const [post, setPost] = useState(initialState);

    function handleSubmit() {
        createOrEdit(post);
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
                <Button loading={submitting} floated='right' positive type='submit' content='Submit'/>
                <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}