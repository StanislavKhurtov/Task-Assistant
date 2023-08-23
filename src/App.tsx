import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValueType, TodolistDomainType} from "./state/todolist-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export const App = () => {

    const changeStatus = (todolistID: string, taskId: string, status: TaskStatuses) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, status: status} : el)})
    };

    const removeTask = (todolistID: string, id: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== id)})
    };

    const addTask = (todolistId: string, title: string) => {
        let task:TaskType = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            todolistId: todolistId,
            description: '',
            startDate: '',
            deadline: '',
            order: 0,
            priority: TaskPriorities.Low,
            addedDate:''
        }
        setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]})
    };

    const changeTaskTitle = (todolistId: string, id: string, newValue: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, title: newValue} : el)})
    };

    const changeFilter = (todolistID: string, value: FilterValueType) => {
        setTodolist(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    };

    const removeTodolist = (todolistId: string) => {
        setTodolist(todolists.filter(el => el.id !== todolistId));
        delete tasks[todolistId];
        setTasks({...tasks})
    };

    const addTodolist = (title: string) => {
        let newTodolist: TodolistDomainType = {id: v1(), title: title, filter: "all", addedDate: '', order: 0};
        setTodolist([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolist.id]: []})
    };

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolist(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
    };

    const todolistId_1 = v1();
    const todolistId_2 = v1();

    let [todolists, setTodolist] = useState<Array<TodolistDomainType>>([
        {id: todolistId_1, title: 'What to learn', filter: "all", addedDate: '', order: 0},
        {id: todolistId_2, title: 'What to buy', filter: "all", addedDate: '', order: 0},
    ]);

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [{
            id: v1(),
            title: "HTML&CSS",
            status: TaskStatuses.Completed,
            todolistId: todolistId_1,
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low
        },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todolistId: todolistId_1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }],
        [todolistId_2]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                todolistId: todolistId_2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.Completed,
                todolistId: todolistId_2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ]

    })

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
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container gap={10}>
                    {todolists.map((el) => {

                        let taskForTodolist = tasks[el.id];

                        if (el.filter === 'completed') {
                            taskForTodolist = taskForTodolist.filter(el => el.status === TaskStatuses.New)
                        }

                        if (el.filter === 'active') {
                            taskForTodolist = taskForTodolist.filter(el => el.status === TaskStatuses.Completed)
                        }

                        return (
                            <div>
                                <Grid item>
                                    <Paper style={{padding: "20px"}}>
                                        <Todolist
                                            key={el.id}
                                            id={el.id}
                                            title={el.title}
                                            tasks={taskForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            filter={el.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            </div>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}