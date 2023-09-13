import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditebleSpan} from "../../../components/EditableSpan/EditebleSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValueType, TodolistDomainType} from "../todolist-reducer";
import {useAppDispatch} from "../../../app/store";
import {fetchTasksTC} from "../task-reducer";


type TodolistType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, value: FilterValueType) => void
    addTask: (todolistID: string, newTitle: string) => void
    changeStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, id: string, newValue: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: TodolistType) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const addTask = useCallback((newTitle: string) => {
        props.addTask(props.todolist.id, newTitle)
    }, [props.addTask, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    };

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [props.changeTodolistTitle, props.todolist.id])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'all'), [props.changeFilter, props.todolist.id]);

    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'active'), [props.changeFilter, props.todolist.id]);

    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'completed'), [props.changeFilter, props.todolist.id]);


    let taskForTodolist = props.tasks;

    if (props.todolist.filter === 'active') {
        taskForTodolist = props.tasks.filter(el => el.status === TaskStatuses.New)
    }

    if (props.todolist.filter === 'completed') {
        taskForTodolist = props.tasks.filter(el => el.status === TaskStatuses.Completed)
    }

    return (
        <div className={'todolist'}>
            <div className="todolistBody">
                <h3 className={"todolistTitle"}>
                    <EditebleSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
                    <IconButton size="small" onClick={removeTodolist}
                                disabled={props.todolist.entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
                <div className={'items'}>
                    {
                        taskForTodolist?.map(el => <Task
                            key={el.id}
                            task={el}
                            changeTaskTitle={props.changeTaskTitle}
                            changeStatus={props.changeStatus}
                            removeTask={props.removeTask}
                            todolistId={props.todolist.id}
                        />)
                    }
                </div>
                <div className={'btns'}>
                    <Button variant={props.todolist.filter === 'all' ? 'contained' : "text"}
                            onClick={onAllClickHandler}>All</Button>
                    <Button color={"primary"} variant={props.todolist.filter === 'active' ? 'contained' : "text"}
                            onClick={onActiveClickHandler}>Active</Button>
                    <Button color={"secondary"} variant={props.todolist.filter === 'completed' ? 'contained' : "text"}
                            onClick={onCompletedClickHandler}>Completed</Button>
                </div>
            </div>
        </div>
    );
})


