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
                this.setPost(post);
            })
            this.setInitialLoading(false);
        } catch(error) {
            console.log(error);
            this.setInitialLoading(false);
        }
    }

    loadPost = async (id: string) => {
        let post = this.getPost(id);
        if(post) {
            this.selectedPost = post;
        } else {
            this.initialLoading = true;
            try {
                post = await agent.Posts.details(id);
                this.setPost(post);
                this.setInitialLoading(false);
            } catch (error) {
                console.log(error);
                this.setInitialLoading(false);
            }
        }
    }

    private setPost = (post: Post) => {
        // We might want to keep the full time stamp as well as the date.
        post.created = post.created.split('T')[0];
        post.modified = post.modified.split('T')[0];
        this.postRegistry.set(post.id, post);
    }

    private getPost = (id: string) => {
        return this.postRegistry.get(id);
    }

    get postsByCreatedDate() {
        return Array.from(this.postRegistry.values()).sort((a, b) => Date.parse(b.created) - Date.parse(a.created));
    }

    setInitialLoading = (state: boolean) => {
        this.initialLoading = state;
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