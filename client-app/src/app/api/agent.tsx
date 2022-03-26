import axios, { AxiosResponse } from 'axios';
import { Post } from '../models/post';

axios.defaults.baseURL = 'https://localhost:5001/api';

const responseBody = <T extends any> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T extends any> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T extends any> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T extends any> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T extends any> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Posts = {
    list: () => requests.get<Post[]>('/posts')
}

const agent = {
    Posts
}

export default agent;