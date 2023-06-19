import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../../App";


export type TypeTask = {
    id: string,
    title: string,
    isDone: boolean
}


type PropsType = {
    title: string,
    tasks: TypeTask[],
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError("Title is requares")
        }

    }
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="errorMessage">{error}</div>}
            </div>
            <ol>
                {
                    props.tasks.map(el => {

                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(el.id, e.currentTarget.checked)
                            console.log(el.id + e.currentTarget.checked)
                        }

                        const onRemoveHandler = () => props.removeTask(el.id);

                        return (
                            <li key={el.id} className={el.isDone ? "isDone" : ""}>
                                <button onClick={onRemoveHandler}>x</button>
                                <input type="checkbox" onChange={onChangeHandler} checked={el.isDone}/>
                                <span>{el.title}</span>
                            </li>
                        )
                    })
                }
            </ol>
            <div>
                <button className={props.filter === 'all' ? "activeFilter" : ""} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? "activeFilter" : ""} onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? "activeFilter" : ""} onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}