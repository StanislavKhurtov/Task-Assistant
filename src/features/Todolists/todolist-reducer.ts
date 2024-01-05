import {todolistAPI, TodolistType} from "api/todolist-api";
import {appActions, RequestStatusType} from "app/app-reducer";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "app/store";
import {tasksThunks} from "features/Todolists/task-reducer";
import {handleServerNetworkError} from "utils";

const initialState: TodolistDomainType[] = []

export type FilterValueType = 'all' | 'completed' | 'active';

export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    entityStatus: RequestStatusType
}

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.push({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValueType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{id: string, status: RequestStatusType}>) {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].entityStatus = action.payload.status
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        },
        clearTodosDataAC(state, action: PayloadAction<{}>) {
            return []
        },
    }
})
export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;

// Thunk Creator
export const getTodolistTC = ():AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatusAC({status: 'loading'}));
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(todolistsActions.setTodolistsAC({todolists :res.data}));
            dispatch(appActions.setAppStatusAC({status: 'succeeded'}));
            return res.data
        })
        .then((todos) => {
            todos.forEach((tl) => {
                dispatch(tasksThunks.fetchTasks(tl.id));
            });
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodolistTC = (todolistId: string):AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatusAC({status: 'loading'}))
    dispatch(todolistsActions.changeTodolistEntityStatusAC({id: todolistId ,status: 'loading'}))
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(todolistsActions.removeTodolistAC({id: todolistId}))
            dispatch(appActions.setAppStatusAC({status: 'succeeded'}));
        })
}
export const addTodolistTC = (title: string):AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatusAC({status: 'loading'}));
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(todolistsActions.addTodolistAC({todolist: res.data.data.item}))
            dispatch(appActions.setAppStatusAC({status: 'succeeded'}));
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string):AppThunk => (dispatch) => {
    todolistAPI.updateTodolist(todolistId, title)
        .then(() => {
            dispatch(todolistsActions.changeTodolistTitleAC({id: todolistId,title: title}))
        })
}