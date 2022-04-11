import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Post } from "../models/post";
import { v4 as uuid } from 'uuid';

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

    createPost = async(post: Post) => {
        this.loading = true;
        const rightNow = (new Date()).toISOString().slice(0,10);
        post.id = uuid();
        post.created = rightNow;
        post.modified = rightNow;

        try {
            await agent.Posts.create(post);
            runInAction(() => {
                this.posts.push(post);
                this.selectedPost = post;
                this.editMode = false;
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updatePost = async (post: Post) => {
        this.loading = true;
        try {
            await agent.Posts.update(post);
            runInAction(() => {
                this.posts = [...this.posts.filter(p => p.id !== post.id), post];
                this.selectedPost = post;
                this.editMode = false;
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deletePost = async (id: string) => {
        this.loading = true;
        try {
            await agent.Posts.delete(id);
            runInAction(() => {
                this.posts = [...this.posts.filter(post => post.id !== id)];
                if(this.selectedPost?.id === id) this.cancelSelectedPost();
                this.loading = false;
            })
        } catch(error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}