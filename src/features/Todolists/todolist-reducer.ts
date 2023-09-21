import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTasksTC} from "./task-reducer";
import {AppRootState, AppThunk} from "../../app/store";

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
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(todolistsActions.setTodolistsAC({todolists :res.data}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
            return res.data
        })
        .then((todos) => {
            todos.forEach((tl) => {
                dispatch(fetchTasksTC(tl.id));
            });
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodolistTC = (todolistId: string):AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(todolistsActions.changeTodolistEntityStatusAC({id: todolistId ,status: 'loading'}))
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(todolistsActions.removeTodolistAC({id: todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}));
        })
}
export const addTodolistTC = (title: string):AppThunk => (dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistAPI.createTodolist(title)
        .then((res) => {
            dispatch(todolistsActions.addTodolistAC({todolist: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}));
        })
}
export const changeTodolistTitleTC = (todolistId: string, title: string):AppThunk => (dispatch) => {
    todolistAPI.updateTodolist(todolistId, title)
        .then(() => {
            dispatch(todolistsActions.changeTodolistTitleAC({id: todolistId,title: title}))
        })
}

//type

// export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
// export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
// export type SetTodolistsActionType= ReturnType<typeof setTodolistsAC>














