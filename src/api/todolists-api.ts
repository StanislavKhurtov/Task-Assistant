import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '407432d0-8fb3-48b8-9578-523f43ccc02f',
    },
}

export type TodolistType = {
    id: string,
    title:string,
    addedDate:string,
    order:number
}

type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: TodolistType
    }
}

type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}




export const todolistAPI = {
    getTodolists() {
        const promise = axios.get<Array<TodolistType>>(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/`,
            settings
        )
        return promise
    },
    createTodolists(title: string) {
        const promise = axios.post<CreateTodolistResponseType>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
        return promise
    },
    deleteTodolists(id: string) {
        const promise = axios.delete<DeleteTodolistResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
        return promise
    },
    updateTodolistsTitle(id: string, title:string) {
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title}, settings)
        return promise
    }
}