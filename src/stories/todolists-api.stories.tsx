import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolists-api";


export default {
    title: 'API'
}

let settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '407432d0-8fb3-48b8-9578-523f43ccc02f'
    },
}

export const GetTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolists('Bla Bla')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistAPI.deleteTodolists('89e08726-4f7b-4ccd-8de9-d23e305baa9a')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
};

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
      todolistAPI.updateTodolistsTitle('a8f31c40-cd3e-4b9f-bc3e-7a12a01c8b50', 'Fuck')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
};


