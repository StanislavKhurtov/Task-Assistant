import React, {ChangeEvent, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolist = () => {

    const [state, setState] = useState<any>(null)

    const getTodolist = () => {
        todolistAPI.getTodolist()
            .then(res => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <button onClick={getTodolist}>Get Todolist</button>
    </div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodolist = () => {
        todolistAPI.createTodolist(title)
            .then(res => {
                setState(res.data)
            })
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return <div>{JSON.stringify(state)}
        <input type="text" value={title} placeholder={'New Title'} onChange={onChangeHandler}/>
        <button onClick={createTodolist}>Create Todolist</button>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                setState(res.data)
            })
    }

    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return <div>{JSON.stringify(state)}
        <input type="text" value={todolistId} placeholder={'todolistId'} onChange={onChangeTodolistId}/>
        <button onClick={deleteTodolist}>Delete Todolist</button>
    </div>
}

export const UpdateTodolistTitle = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const updateTodolistTitle = () => {
        todolistAPI.updateTodolist(todolistId, title)
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
        <input type="text" value={todolistId} placeholder={'todolistId'} onChange={onChangeTodolistId}/>
        <input type="text" value={title} placeholder={'New Title'} onChange={onChangeHandler}/>
        <button onClick={updateTodolistTitle}>Update Todolist Title</button>
    </div>
}

export const GetTask = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTask = () => {
        todolistAPI.getTask(todolistId)
            .then(res => {
                setState(res.data)
            })
    }

    const onChangeTodolistId = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    return <div>{JSON.stringify(state)}
        <input type="text" value={todolistId} placeholder={'todolistId'} onChange={onChangeTodolistId}/>
        <button onClick={getTask}>get task</button>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        todolistAPI.createTask(todolistId, title)
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
        <input type="text" value={todolistId} placeholder={'todolistId'} onChange={onChangeTodolistId}/>
        <input type="text" value={title} placeholder={'New Title'} onChange={onChangeHandler}/>
        <button onClick={createTask}>create task</button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
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
            <input type="text" value={todolistId} placeholder={'todolistId'} onChange={onChangeTodolistId}/>
            <input type="text" value={taskId} placeholder={'taskId'} onChange={onChangeTaskId}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('description 1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const updateTaskTitle = () => {
        todolistAPI.updateTask(todolistId, taskId,
            {
                title: title,
                deadline: '',
                description: description,
                priority: priority,
                startDate: '',
                status: status,
            }
        )
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

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onChangeHandlerDescription = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.currentTarget.value)
    }
    const onChangeHandlerStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(+e.currentTarget.value)
    }
    const onChangeHandlerPriority = (e: ChangeEvent<HTMLInputElement>) => {
        setPriority(+e.currentTarget.value)
    }


    return <div>{JSON.stringify(state)}
        <input type="text" value={todolistId} placeholder={'todolistId'} onChange={onChangeTodolistId}/>
        <input type="text" value={taskId} placeholder={'taskId'} onChange={onChangeTaskId}/>
        <input type="text" value={title} placeholder={'New Title'} onChange={onChangeHandler}/>
        <input type="text" value={description} placeholder={'description'} onChange={onChangeHandlerDescription}/>
        <input type="text" value={status} placeholder={'status'} onChange={onChangeHandlerStatus}/>
        <input type="text" placeholder={'priority'} onChange={onChangeHandlerPriority}/>

        <button onClick={updateTaskTitle}>Update Task Title</button>
    </div>
}



