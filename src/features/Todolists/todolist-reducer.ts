import {ResultCode, todolistAPI, TodolistType, UpdateTodolistTitleArgType} from "api/todolist-api";
import {appActions, RequestStatusType} from "app/app-reducer";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "app/store";
import {tasksThunks} from "features/Todolists/task-reducer";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "utils";

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
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValueType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state[index].filter = action.payload.filter
        },
        setEntityStatus: (
            state,
            action: PayloadAction<{ entityStatus: RequestStatusType; id: string }>
        ) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)

            if (index !== -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        },
        clearTodosDataAC(state, action: PayloadAction<{}>) {
            return []
        },
    },
    extraReducers: builder => {
        builder
            .addCase(todolistThunk.getTodolist.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
            })
            .addCase(todolistThunk.removeTodolist.fulfilled, (state, action)=>{
                const index = state.findIndex(todo => todo.id === action.payload.id)
                if (index !== -1) state.splice(index, 1)
            })
            .addCase(todolistThunk.addTodolist.fulfilled, (state, action) => {
                state.push({...action.payload.todolist, filter: "all", entityStatus: "idle"})
            })
            .addCase(todolistThunk.changeTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.id)
                if (index !== -1) state[index].title = action.payload.title
            })
    }
})

const getTodolist = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
    `${slice.name}/getTodolist`,
    async (_, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI

        try {
            dispatch(appActions.setAppStatusAC({status: 'loading'}))
            const res = await todolistAPI.getTodolist()

            dispatch(appActions.setAppStatusAC({status: 'succeeded'}))

            return {todolists: res.data}
        } catch (error) {
            handleServerNetworkError(error, dispatch)

            return rejectWithValue(null)
        }
    }
)

const removeTodolist = createAppAsyncThunk<{ id: string }, string>(
    `${slice.name}/removeTodolist`,
    async (id, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI

        try {
            dispatch(appActions.setAppStatusAC({status: 'loading'}))
            dispatch(todolistsActions.setEntityStatus({entityStatus: 'loading', id}))
            const res = await todolistAPI.deleteTodolist(id)

            if (res.data.resultCode === ResultCode.success) {
                dispatch(todolistsActions.setEntityStatus({entityStatus: 'succeeded', id}))
                dispatch(appActions.setAppStatusAC({status: 'succeeded'}))

                return {id}
            } else {
                handleServerAppError(res.data, dispatch)

                return rejectWithValue(null)
            }
        } catch (e) {
            dispatch(todolistsActions.setEntityStatus({entityStatus: 'idle', id}))
            handleServerNetworkError(e, dispatch)

            return rejectWithValue(null)
        }
    }
)
const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
    `${slice.name}/addTodolist`,
    async (title, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI

        try {
            dispatch(appActions.setAppStatusAC({status: 'loading'}))
            const res = await todolistAPI.createTodolist(title)

            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setAppStatusAC({status: 'succeeded'}))

                return {todolist: res.data.data.item}
            } else {
                handleServerAppError(res.data, dispatch)

                return rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)

            return rejectWithValue(null)
        }
    }
)
const changeTodolistTitle = createAppAsyncThunk<
    UpdateTodolistTitleArgType,
    UpdateTodolistTitleArgType
>(`${slice.name}/changeTodolistTitle`, async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
        dispatch(appActions.setAppStatusAC({ status: 'loading' }))
        const res = await todolistAPI.updateTodolist(arg)

        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setAppStatusAC({ status: 'succeeded' }))

            return arg
        } else {
            handleServerAppError(res.data, dispatch)

            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)

        return rejectWithValue(null)
    }
})

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistThunk = {getTodolist, removeTodolist, addTodolist, changeTodolistTitle}