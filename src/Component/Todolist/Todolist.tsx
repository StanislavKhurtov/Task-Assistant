import React, {useState} from "react";
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


}

export const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("")


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={(e) => {
                           setNewTaskTitle(e.currentTarget.value)
                       }}
                       onKeyPress={(e) => {
                           if (e.charCode === 13) {
                               props.addTask(newTaskTitle)
                               setNewTaskTitle("")
                           }
                               }}
                />
                <button onClick={() => {
                    props.addTask(newTaskTitle)
                    setNewTaskTitle("")
                }}>+
                </button>
            </div>
            <ol>
                {
                    props.tasks.map(el =>
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => props.removeTask(el.id)}>x</button>
                        </li>
                    )
                }
            </ol>
            <div>
                <button onClick={() => {
                    props.changeFilter("all")
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter("active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter("completed")
                }}>Completed
                </button>
            </div>
        </div>
    );
}