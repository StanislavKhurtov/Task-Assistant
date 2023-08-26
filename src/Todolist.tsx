import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditebleSpan} from "./EditebleSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValueType} from "./state/todolist-reducer";
import {useAppDispatch} from "./state/store";
import {getTasksTC} from "./state/task-reducer";


type TodolistType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, value: FilterValueType) => void
    addTask: (todolistID: string, newTitle: string) => void
    changeStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, id: string, newValue: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = React.memo((props: TodolistType) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(props.id))
    }, [])

    const addTask = useCallback((newTitle: string) => {
        props.addTask(props.id, newTitle)
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    };

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'), [props.changeFilter, props.id]);

    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props.changeFilter, props.id]);

    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id]);


    let taskForTodolist = props.tasks;

    if (props.filter === 'active') {
        taskForTodolist = props.tasks.filter(el => el.status === TaskStatuses.New)
    }

    if (props.filter === 'completed') {
        taskForTodolist = props.tasks.filter(el => el.status === TaskStatuses.Completed)
    }

    return (
        <div className={'todolist'}>
            <div className="todolistBody">
                <h3 className={"todolistTitle"}>
                    <EditebleSpan title={props.title} onChange={changeTodolistTitle}/>
                    <IconButton size="small" onClick={removeTodolist}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <div className={'items'}>
                    {
                        taskForTodolist?.map(el => <Task
                            key={el.id}
                            task={el}
                            changeTaskTitle={props.changeTaskTitle}
                            changeStatus={props.changeStatus}
                            removeTask={props.removeTask}
                            todolistId={props.id}
                        />)
                    }
                </div>
                <div className={'btns'}>
                    <Button variant={props.filter === 'all' ? 'contained' : "text"}
                            onClick={onAllClickHandler}>All</Button>
                    <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : "text"}
                            onClick={onActiveClickHandler}>Active</Button>
                    <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : "text"}
                            onClick={onCompletedClickHandler}>Completed</Button>
                </div>
            </div>
        </div>
    );
})


