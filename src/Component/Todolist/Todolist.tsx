import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export type TypeTask = {
    id: string,
    title: string,
    isDone: boolean
}


type PropsType = {
    id: string,
    title: string,
    tasks: TypeTask[],
    removeTask: (id: string, todolistId: string) => void,
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void

}

export const Todolist = (props: PropsType) => {


    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");
    const removeTodolist = () => props.removeTodolist(props.id);
    const addTask = (title: string) => props.addTask(props.id, title);

    const ChangeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={ChangeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(el => {

                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
                        };

                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(el.id, newValue, props.id)
                        };

                        const onRemoveHandler = () => props.removeTask(el.id, props.id);

                        return (
                            <li key={el.id} className={(!el.isDone ? "isDone" : "") + " " + "item"}>
                                <IconButton aria-label="delete" onClick={onRemoveHandler}>
                                    <Delete sx={{fontSize: 16}} />
                                </IconButton>
                                <input type="checkbox" onChange={onChangeStatusHandler} checked={el.isDone}/>
                                <EditableSpan title={el.title} onChange={onChangeTitleHandler}/>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : "text"} onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? "contained" : "text"}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? "contained" : "text"}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
}






