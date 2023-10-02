import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskType} from "api/todolist-api";
import {TodolistList} from "features/Todolists/TodolistList";
import {ErrorSnackbar} from "components/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "./store";
import {initializedAppTC, RequestStatusType} from "./app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "features/Login/Login";
import {logoutTC} from "features/Login/auth-reducer";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

export const App = React.memo(({demo = false}: PropsType) => {
    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    },[])

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])

    if (!isInitialized) {
        return (
            <div style={{position: "fixed", top: '40%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log Out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={"/"} element={<TodolistList demo={demo}/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path='*' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
})




