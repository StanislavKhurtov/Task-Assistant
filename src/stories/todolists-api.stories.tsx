import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodolist()
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistAPI.createTodolist('New Todo')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
      todolistAPI.deleteTodolist('c4790217-bb47-4dbe-a20e-6f1cc796c810')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistAPI.updateTodolist('dd32a501-889d-4560-9f61-a1409315fe66', 'Egor Khurtov')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const GetTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTask('511679e0-d6d3-4f3c-9081-f800f0c25ca7')
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask= () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTask('511679e0-d6d3-4f3c-9081-f800f0c25ca7','New Task!!!')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTask('511679e0-d6d3-4f3c-9081-f800f0c25ca7','03bd53e8-bef4-42e0-8724-c517afeea0aa')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTask('511679e0-d6d3-4f3c-9081-f800f0c25ca7','74ca9fa7-3f00-44ad-8d08-c8cdfb8ab21d','Update Task Title')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}



