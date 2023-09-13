import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterValueType,
    getTodolistTC,
    removeTodolistTC,
    TodolistDomainType
} from "./todolist-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./task-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "../../app/App";

type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<TodolistsListPropsType> = ({demo = false}) => {
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useAppSelector<TasksStateType>(state => state.tasks);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(getTodolistTC())
    }, [])

    const removeTask = useCallback((todolistID: string, id: string) => {
        dispatch(removeTaskTC(todolistID, id));
    }, [dispatch]);

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskTC(todolistID, title));
    }, [dispatch]);

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title}));
    }, [dispatch]);

    const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}));
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
        dispatch(changeTodolistTitleTC(todolistId, newTitle))
    }, [dispatch]);

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