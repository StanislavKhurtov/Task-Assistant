import React, {useReducer} from 'react';
import './App.css';
import { Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValueType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/task-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export const AppWithReducer = () => {

    const todolistId_1 = v1();
    const todolistId_2 = v1();

    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
        {id: todolistId_1, title: 'What to learn', filter: "all",addedDate: '', order: 0},
        {id: todolistId_2, title: 'What to buy', filter: "all",addedDate: '', order: 0},
    ]);

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed,
                todolistId: todolistId_1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low},
            {id: v1(), title: 'JavaScript', status: TaskStatuses.Completed,
                todolistId: todolistId_1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low},
            {id: v1(), title: 'React', status: TaskStatuses.New,
                todolistId: todolistId_1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low},


        ],
        [todolistId_2]: [
            {id: v1(), title: 'Book', status: TaskStatuses.Completed,
                todolistId: todolistId_2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low},
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed,

                todolistId: todolistId_2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low},
        ],
    })

    const removeTask = (todolistID: string, id: string) => {
        dispatchToTasksReducer(removeTaskAC(todolistID, id));
    };

    const addTask = (todolistID: string, title: string) => {
        dispatchToTasksReducer(addTaskAC(todolistID, title));
    };

    const changeTaskTitle = (todolistId: string, id: string, newValue: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(todolistId, id, newValue));
    };

    const changeStatus = (todolistID: string, taskId: string, status: TaskStatuses) => {
        dispatchToTasksReducer(changeTaskStatusAC(todolistID, taskId, status));
    };

    const changeFilter = (todolistID: string, value: FilterValueType) => {
        dispatchToTodolistReducer(changeTodolistFilterAC(todolistID, value));
    };

    const removeTodolist = (todolistId: string) => {
        dispatchToTasksReducer(removeTodolistAC(todolistId));
        dispatchToTodolistReducer(removeTodolistAC(todolistId));
    };

    const addTodolist = (title: string) => {
        dispatchToTasksReducer(addTodolistAC(title));
        dispatchToTodolistReducer(addTodolistAC(title));
    };

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatchToTodolistReducer(changeTodolistTitleAC(todolistId, newTitle))
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
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container gap={10}>
                    {todolists.map((el) => {

                        let taskForTodolist = tasks[el.id];

                        if (el.filter === 'completed') {
                            taskForTodolist = taskForTodolist.filter(el => el.status === TaskStatuses.Completed)
                        }

                        if (el.filter === 'active') {
                            taskForTodolist = taskForTodolist.filter(el => el.status === TaskStatuses.New)
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