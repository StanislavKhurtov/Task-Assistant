import {ResultCode, TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "api/todolist-api";
import {Dispatch} from "redux";
import {AppRootState} from "app/store";
import {TasksStateType} from "app/App";
import {createAsyncThunk, createSlice,PayloadAction} from "@reduxjs/toolkit";
import {todolistsActions} from "./todolist-reducer";
import {appActions} from "app/app-reducer";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "utils";

const initialState: TasksStateType = {};

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
    `tasks/fetchTasks`,
    async (todolistId, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        try {
            dispatch(appActions.setAppStatusAC({ status: 'loading' }))
            const res = await todolistAPI.getTasks(todolistId)

            dispatch(appActions.setAppStatusAC({ status: 'succeeded' }))

            return { tasks: res.data.items, todolistId }
        } catch (error) {
            handleServerNetworkError(error, dispatch)

            return rejectWithValue(null)
        }
    }
)

const removeTask = createAppAsyncThunk<
    { taskId: string; todolistId: string },
    { taskId: string; todolistId: string }
>(`tasks/removeTask`, async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
        dispatch(appActions.setAppStatusAC({ status: 'loading' }))
        const res = await todolistAPI.deleteTask(arg.todolistId, arg.taskId)

        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setAppStatusAC({ status: 'succeeded' }))

            return { taskId: arg.taskId, todolistId: arg.todolistId }
        } else {
            handleServerAppError(res.data, dispatch)

            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)

        return rejectWithValue(null)
    }
})

const addTask = createAppAsyncThunk<{ task: TaskType }, { id: string; title: string }>(
    `tasks/addTask`,
    async (arg, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        try {
            dispatch(appActions.setAppStatusAC({ status: 'loading' }))
            const res = await todolistAPI.createTask(arg.id, arg.title)

            if (res.data.resultCode === ResultCode.success) {
                dispatch(appActions.setAppStatusAC({ status: 'succeeded' }))

                return { task: res.data.data.item }
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

const updateTask = createAppAsyncThunk<
    { model: UpdateDomainTaskModelType; taskId: string; todolistId: string },
    { domainModel: UpdateDomainTaskModelType; taskId: string; todolistId: string }
>(`tasks/updateTask`, async (arg, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI

    try {
        const state = getState()
        const task = state.tasks[arg.todolistId].find(el => el.id === arg.taskId)

        if (!task) {
            console.warn('Task not found in te state')

            return rejectWithValue(null)
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: task.title,
            ...arg.domainModel,
        }

        dispatch(appActions.setAppStatusAC({ status: 'loading' }))
        const res = await todolistAPI.updateTask(arg.todolistId, arg.taskId, apiModel)

        if (res.data.resultCode === ResultCode.success) {
            dispatch(appActions.setAppStatusAC({ status: 'succeeded' }))

            return { model: arg.domainModel, taskId: arg.taskId, todolistId: arg.todolistId }
        } else {
            handleServerAppError(res.data, dispatch)

            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)

        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(todolistsActions.addTodolistAC, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsActions.removeTodolistAC, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todolistsActions.setTodolistsAC, (state, action) => {
                action.payload.todolists.forEach((tl: any) => {
                    state[tl.id] = []
                })
            })
            .addCase(todolistsActions.clearTodosDataAC, (state, action) => {
                return {};
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) {
                    tasks.splice(index, 1)
                }
            })
            .addCase(addTask.fulfilled, (state, action) => {
                const tasksForTodo = state[action.payload.task.todoListId]

                tasksForTodo.unshift(action.payload.task)
            })
            .addCase(updateTask.fulfilled,(state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) tasks[index] = {...tasks[index], ...action.payload.model}
            })
    },
})

//Thunk Type

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = {fetchTasks, removeTask, addTask, updateTask}


