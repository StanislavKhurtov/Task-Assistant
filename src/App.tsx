import React, {useState} from 'react';
import './App.css';
import {Todolist, TypeTask} from "./Component/Todolist/Todolist";

export type FilterValuesType = "all" | "active" | "completed";

const App = () => {

    let [tasks, setTasks] = useState<Array<TypeTask>>([
        {id: 1, title: "Html&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }


    const removeTask = (id: number) => {
        let filteredTask = tasks.filter((el) => el.id !== id)
        setTasks(filteredTask);
    }

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(el => el.isDone)
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(el => !el.isDone)
    }


    return (
        <div className="App">
            <Todolist
                title="What to Learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
