import axios from 'axios'


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '407432d0-8fb3-48b8-9578-523f43ccc02f',
    },
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export type CreateType = {
    item: TodolistType
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksResponse = {
    items: TaskType[],
    totalCount: number,
    error: null | string
}




export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(`todo-lists`);

    },
    createTodolists(title: string) {
        return instance.post<ResponseType<CreateType>>('todo-lists', {title: title});

    },
    deleteTodolists(id: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${id}`);
        return promise;
    },
    updateTodolistsTitle(id: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${id}`, {title: title});
        return promise;
    },
    getTasks(id: string) {
        const promise = instance.get<GetTasksResponse>(`todo-lists/${id}/tasks`);
        return promise;
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    }
}