import React from "react";

export type TypeTask = {
    id: number,
    title: string,
    isDone: boolean
}


type PropsType = {
    title: string,
    tasks: TypeTask[],
    removeTask:Function


}

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ol>
                {
                    props.tasks.map(el =>
                        <li key={el.id}>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={()=>props.removeTask(el.id)}>x</button>
                        </li>
                    )
                }
            </ol>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}