import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Component/Todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

const App = () => {


    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let chTask = tasks[todolistId]
        let task = chTask.find(el => el.id === taskId)
        if (task) {
            task.isDone = isDone;

            setTasks({...tasks})
        }
    }

    const removeTask = (id: string, todolistId: string) => {
        let task = tasks[todolistId]
        let filterTasks = task.filter(el => el.id !== id)
        tasks[todolistId] = filterTasks
        setTasks({...tasks})
    }

    const addTask = (todolistId: string, title: string) => {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let task = tasks[todolistId]
        let newAddTasks = [newTask, ...task];
        tasks[todolistId] = newAddTasks
        setTasks({...tasks});

    }

    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        /*   let todolist = todolists.find(el => el.id === todolistID)
           if (todolist) {
               todolist.filter = value;
               setTodolist([...todolists])
           }*/

        setTodolist(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))

    }


    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to Learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "Html&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQl", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Sugar", isDone: true},
        ],
    });


    return (
        <div className="App">

            {todolists.map((el) => {

                let tasksForTodolist = tasks[el.id];

                if (el.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(el => el.isDone);
                }
                if (el.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(el => !el.isDone);
                }


                return (
                    <Todolist
                        key={el.id}
                        id={el.id}
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
