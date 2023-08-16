import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '407432d0-8fb3-48b8-9578-523f43ccc02f',
    },
}

export const todolistAPI = {
    getTodolists() {
        const promise = axios.get(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/`,
            settings
        )
        return promise
    },
    createTodolists(title: string) {
        const promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
        return promise
    },
    deleteTodolists(id: string) {
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
        return promise
    },
    updateTodolistsTitle(id: string, title:string) {
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title}, settings)
        return promise
    }
}