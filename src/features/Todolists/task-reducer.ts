import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "api/todolist-api";
import {Dispatch} from "redux";
import {AppRootState} from "app/store";
import {TasksStateType} from "app/App";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsActions} from "./todolist-reducer";
import {appActions} from "app/app-reducer";

const initialState: TasksStateType = {};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}))
    const res = await todolistAPI.getTasks(todolistId)
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
    return {todolistId, tasks: res.data.items}

})
export const removeTask = createAsyncThunk('tasks/removeTaskTC',
    async (param: { todolistId: string, taskId: string }, thunkAPI) => {
        thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}))
        const res = await todolistAPI.deleteTask(param.todolistId, param.taskId)
        thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
        return {todolistId: param.todolistId, taskId: param.taskId}
    })


const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{
            todolistId: string,
            taskId: string,
            model: UpdateDomeinTaskModelType
        }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) tasks[index] = {...tasks[index], ...action.payload.model}
        },
    },
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
            });
    },
})




export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatusAC({status: 'loading'}))
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(tasksActions.addTaskAC({task: res.data.data.item}));
                dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomeinTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootState) => {

        const state = getState();
        const task = state.tasks[todolistId].find(el => el.id === taskId);

        if (!task) {
            console.warn("Task not found in te state")
            return;
        }

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }

        todolistAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(tasksActions.updateTaskAC({todolistId, taskId, model: domainModel}))
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch);
            })
    }

//Thunk Type

export type UpdateDomeinTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { fetchTasks,removeTask }


