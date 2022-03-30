import { makeAutoObservable } from "mobx";

export default class PostStore {
    title = 'MobX set up and ready to go.';

    constructor() {
        makeAutoObservable(this)
    }

    setTitle = () => {
        this.title += '!';
    }
}