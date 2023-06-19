import React, {useState} from 'react';
import './App.css';
import {Todolist, TypeTask} from "./Component/Todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType ={
    id: string,
    title: string,
    filter: FilterValuesType
}

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

    const changeStatus = (taskId: string, isDone: boolean) => {
        //let task = tasks.find(el => el.id === taskId)
        //if (task) {
        //    task.isDone = isDone;
        //}
        //setTasks([...tasks])

        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: isDone} : el))

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
        tasksForTodolist = tasks.filter(el => el.isDone);
    }
    if (filter === "active") {
        tasksForTodolist = tasks.filter(el => !el.isDone);
    }

    let todolist: Array<TodolistType> = [
        {id: v1(), title: "What to Learn", filter: "active"},
        {id: v1(), title: "What to buy", filter: "completed"},
    ]


    return (
        <div className="App">
            {todolist.map((el)=>{
                return (
                    <Todolist
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                    />
                );
            })}
        </div>
    );
}

export default App;
