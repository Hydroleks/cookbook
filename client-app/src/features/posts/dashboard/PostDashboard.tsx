import react from 'react';
import { Grid } from 'semantic-ui-react';
import { Post } from '../../../app/models/post';
import PostDetails from '../details/PostDetails';
import PostForm from '../form/PostForm';
import PostList from './PostList';

interface Props{
    posts: Post[];
    selectedPost: Post | undefined;
    selectPost: (id: string) => void;
    cancelSelectPost: () => void;
    editMode: boolean,
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (post: Post) => void;
}

export default function PostDashboar({posts, selectedPost, selectPost, cancelSelectPost, editMode, openForm, closeForm, createOrEdit}: Props){
    return (
        <Grid>
            <Grid.Column width='10'>
                <PostList posts={posts} selectPost={selectPost}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedPost && !editMode &&
                <PostDetails post={selectedPost} cancelSelectPost={cancelSelectPost} openForm={openForm}/>}
                { editMode && 
                <PostForm closeForm={closeForm} post={selectedPost} createOrEdit={createOrEdit}/> }
            </Grid.Column>
        </Grid>
    );
}