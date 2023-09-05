import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterValueType,
    getTodolistTC,
    removeTodolistTC,
    TodolistDomainType
} from "./state/todolist-reducer";
import {changeTaskTitleAC, createTaskTC, deleteTaskTC, updateTaskTC} from "./state/task-reducer";
import {useAppDispatch, useAppSelector} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithRedux = React.memo(() => {

    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useAppSelector<TasksStateType>(state => state.tasks);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistTC())
    }, [])

    const removeTask = useCallback((todolistID: string, id: string) => {
        dispatch(deleteTaskTC(todolistID, id));
    }, [dispatch]);

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(createTaskTC(todolistID,title));
    }, [dispatch]);

    const changeTaskTitle = useCallback((todolistId: string, id: string, newValue: string) => {
        dispatch(changeTaskTitleAC(todolistId, id, newValue));
    }, [dispatch]);

    const changeStatus = useCallback((todolistID: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistID,taskId,status));
    }, [dispatch]);

    const changeFilter = useCallback((todolistID: string, value: FilterValueType) => {
        dispatch(changeTodolistFilterAC(todolistID, value));
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId));
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todolistId,newTitle))
    }, [dispatch]);


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

                        let allForTodolist = tasks[el.id];
                        let taskForTodolist = allForTodolist;

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
})