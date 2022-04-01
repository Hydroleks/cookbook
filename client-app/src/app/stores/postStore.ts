import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Post } from "../models/post";

export default class PostStore {
    posts: Post[] = [];
    selectedPost: Post | null = null;
    editMode = false;
    loading = false;
    initialLoading = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadPosts = async () => {
        this.initialLoading = true;
        try {
            const posts = await agent.Posts.list();
            posts.forEach(post => {
                // We might want to keep the full time stamp as well as the date.
                post.created = post.created.split('T')[0];
                post.modified = post.modified.split('T')[0];
                this.posts.push(post);
            })
            this.initialLoading = false;
        } catch(error) {
            console.log(error);
            this.initialLoading = false;
        }
    }
}