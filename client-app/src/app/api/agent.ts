import axios, { AxiosResponse } from 'axios';
import { Post } from '../models/post';
import { Recipe } from '../models/recipe';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Posts = {
    list: () => requests.get<Post[]>('/posts'),
    details: (id: string) => requests.get<Post>(`/posts/${id}`),
    create: (post: Post) => requests.post<void>('/posts', post),
    update: (post: Post) => requests.put<void>(`/posts/${post.id}`, post),
    delete: (id: string) => requests.del<void>(`/posts/${id}`)
}

const Recipes = {
    list: () => requests.get<Recipe[]>('/recipes'),
    details: (id: string) => requests.get<Recipe>(`/recipes/${id}`),
    create: (recipe: Recipe) => requests.post<void>('/recipes', recipe),
    update: (recipe: Recipe) => requests.put<void>(`/recipes/${recipe.id}`, recipe),
    delete: (id: string) => requests.del<void>(`/recipes/${id}`)
}

const agent = {
    Posts,
    Recipes
}

export default agent;