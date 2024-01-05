import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "app/store";
import {
    FilterValueType,
    TodolistDomainType,
    todolistsActions,
    todolistThunk
} from "./todolist-reducer";
import {tasksThunks} from "./task-reducer";
import {TaskStatuses} from "api/todolist-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "app/App";
import {Navigate} from "react-router-dom";

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<TodolistsListPropsType> = ({demo = false}) => {
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useAppSelector<TasksStateType>(state => state.tasks);
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(todolistThunk.getTodolist())
    }, [])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(tasksThunks.removeTask({todolistId, taskId}));
    }, [dispatch]);

    const addTask = useCallback((id: string, title: string) => {
        dispatch(tasksThunks.addTask({id, title}));
    }, [dispatch]);

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(tasksThunks.updateTask({todolistId, taskId, domainModel: {title}}));
    }, [dispatch]);

    const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(tasksThunks.updateTask({todolistId, taskId, domainModel: {status}}));
    }, [dispatch]);

    const changeFilter = useCallback((todolistID: string, value: FilterValueType) => {
        dispatch(todolistsActions.changeTodolistFilterAC({id: todolistID, filter: value}));
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(todolistThunk.removeTodolist(todolistId));
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(todolistThunk.addTodolist(title));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(todolistThunk.changeTodolistTitle({id:todolistId, title: newTitle}))
    }, [dispatch]);


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
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
                                        todolist={el}
                                        key={el.id}
                                        tasks={taskForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        demo={demo}
                                    />
                                </Paper>
                            </Grid>
                        </div>
                    );
                })}
            </Grid>
        </>
    )
}