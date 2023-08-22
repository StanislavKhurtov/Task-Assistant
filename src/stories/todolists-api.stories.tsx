import React, {ChangeEvent, useEffect, useState} from 'react'
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
    const [title, setTitle] = useState<string>('')

    const createTodolist = () => {
        todolistAPI.createTodolist(`${title}`)
            .then(res => {
                setState(res.data)
            })
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div>{JSON.stringify(state)}
        <input type="text" placeholder={'New Title'} onChange={onChangeHandler}/>
        <button onClick={createTodolist}>create task</button>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(`${todolistId}`)
            .then(res => {
                setState(res.data)
            })
    }

    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return <div>{JSON.stringify(state)}
        <input type="text" placeholder={'todolistId'} onChange={onChangeTodolistId}/>
        <button onClick={deleteTodolist}>delete task</button>
    </div>
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

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        todolistAPI.createTask(`${todolistId}`, `${title}`)
            .then(res => {
                setState(res.data)
            })
    }

    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div>{JSON.stringify(state)}
        <input type="text" placeholder={'todolistId'} onChange={onChangeTodolistId}/>
        <input type="text" placeholder={'New Title'} onChange={onChangeHandler}/>
        <button onClick={createTask}>create task</button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        todolistAPI.deleteTask(`${todolistId}`, `${taskId}`)
            .then(res => {
                setState(res.data)
            })
    }
    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const onChangeTaskId = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" placeholder={'todolistId'} onChange={onChangeTodolistId}/>
            <input type="text" placeholder={'taskId'} onChange={onChangeTaskId}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTask('511679e0-d6d3-4f3c-9081-f800f0c25ca7', 'a8320061-7fed-4f98-b431-832c8cc23433', 'Update Task Title')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}



