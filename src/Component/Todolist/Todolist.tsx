import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";


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

}

export const Todolist = (props: PropsType) => {


    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");
    const removeTodolist = () => props.removeTodolist(props.id);


    const addTask = (title: string) => props.addTask(props.id, title);


    return (
        <div>
            <h3>{props.title}
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
                                <button onClick={onRemoveHandler}>x</button>
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






