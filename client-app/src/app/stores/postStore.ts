import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Post } from "../models/post";

export default class PostStore {
    posts: Post[] = [];
    selectedPost: Post | undefined = undefined;
    editMode = false;
    loading = false;
    initialLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadPosts = async () => {
        this.setInitialLoading(true);
        try {
            const posts = await agent.Posts.list();
            posts.forEach(post => {
                // We might want to keep the full time stamp as well as the date.
                post.created = post.created.split('T')[0];
                post.modified = post.modified.split('T')[0];
                this.posts.push(post);
            })
            this.setInitialLoading(false);
        } catch(error) {
            console.log(error);
            this.setInitialLoading(false);
        }
    }

    setInitialLoading = (state: boolean) => {
        this.initialLoading = state;
    }

    selectPost = (id: string) => {
        this.selectedPost = this.posts.find(post => post.id === id);
    }

    cancelSelectedPost = () => {
        this.selectedPost = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectPost(id) : this.cancelSelectedPost();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }
}