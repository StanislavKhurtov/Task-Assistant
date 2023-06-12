import React, {useState} from 'react';
import './App.css';
import {Todolist, TypeTask} from "./Component/Todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

const App = () => {

    let [tasks, setTasks] = useState<Array<TypeTask>>([
        {id: v1(), title: "Html&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQl", isDone: false},
    ]);


    let [filter, setFilter] = useState<FilterValuesType>("all")

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const changeStatus =(taskId: string, isDone:boolean) => {
       let task = tasks.find(el=>el.id === taskId)
        if(task) {
            task.isDone = isDone;
        }
        let copy = [...tasks,]
        setTasks(copy)
    }


    const removeTask = (id: string) => {
        let filteredTask = tasks.filter((el) => el.id !== id)
        setTasks(filteredTask);
    }

    const addTask = (title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let newAddTasks = [newTask, ...tasks];
        setTasks(newAddTasks);
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
                addTask={addTask}
                changeTaskStatus={changeStatus}
            />
        </div>
    );
}

export default App;
