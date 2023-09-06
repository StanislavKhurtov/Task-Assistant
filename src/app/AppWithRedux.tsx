import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskType} from "../api/todolist-api";
import {TodolistList} from "../features/Todolists/TodolistList";
import CustomizedSnackbars from "../components/ErrorSnackbar/ErrorSnackbar";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithRedux = React.memo(() => {

    return (
        <div className="App">
            <CustomizedSnackbars />
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
                <LinearProgress />
            </AppBar>
            <Container fixed>
                <TodolistList />
            </Container>
        </div>
    );
})




