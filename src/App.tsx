import React, {useState} from 'react';
import './App.css';
import {Todolist, TypeTask} from "./Component/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Component/AddItemForm/AddItemForm";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TypeTask>
}


const App = () => {

    const changeTodolistTitle = (id: string, newTitle: string) => {
        setTodolist(todolists.map(el => el.id === id ? {...el, title: newTitle} : el))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
        })
    };

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
    };

    const removeTask = (id: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})
    };

    const addTask = (todolistId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    };

    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        setTodolist(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    };

    const removeTodolist = (todolistId: string) => {
        setTodolist(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    };

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID1, title: "What to Learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
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

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {id: v1(), title: title, filter: "all"};
        setTodolist([todolist, ...todolists]);
        setTasks({...tasks, [todolist.id]: []})
    };

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <AddItemForm addItem={addTodolist}/>
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
                        changeTaskTitle={changeTaskTitle}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                );
            })}
        </div>
    );
}


export default App;
