import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Post } from "../models/post";
import { v4 as uuid } from 'uuid';

export default class PostStore {
    postRegistry = new Map<string, Post>();
    selectedPost: Post | undefined = undefined;
    editMode = false;
    loading = false;
    initialLoading = true;

    constructor() {
        makeAutoObservable(this)
    }

    loadPosts = async () => {
        try {
            const posts = await agent.Posts.list();
            posts.forEach(post => {
                // We might want to keep the full time stamp as well as the date.
                post.created = post.created.split('T')[0];
                post.modified = post.modified.split('T')[0];
                this.postRegistry.set(post.id, post);
            })
            this.setInitialLoading(false);
        } catch(error) {
            console.log(error);
            this.setInitialLoading(false);
        }
    }

    get postsByCreatedDate() {
        return Array.from(this.postRegistry.values()).sort((a, b) => Date.parse(b.created) - Date.parse(a.created));
    }

    setInitialLoading = (state: boolean) => {
        this.initialLoading = state;
    }

    selectPost = (id: string) => {
        this.selectedPost = this.postRegistry.get(id);
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
                this.postRegistry.set(post.id, post);
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
                this.postRegistry.set(post.id, post);
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
                this.postRegistry.delete(id);
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