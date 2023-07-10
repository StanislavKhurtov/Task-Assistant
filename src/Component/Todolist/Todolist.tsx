import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {blue} from "@material-ui/core/colors";


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
                <button onClick={removeTodolist}>x</button>
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
                            <li key={el.id} className={el.isDone ? "isDone" : ""}>
                                <button onClick={onRemoveHandler}>
                                    <DeleteForeverIcon sx={{fontSize: 16}}
                                    />
                                </button>
                                <input type="checkbox" onChange={onChangeStatusHandler} checked={el.isDone}/>
                                <EditableSpan title={el.title} onChange={onChangeTitleHandler}/>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? "activeFilter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? "activeFilter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? "activeFilter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}






