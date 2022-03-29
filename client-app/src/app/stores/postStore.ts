import { makeObservable, observable } from "mobx";

export default class PostStore {
    title = 'MobX set up and ready to go.';

    constructor() {
        makeObservable(this, {
            title: observable
        })
    }
}