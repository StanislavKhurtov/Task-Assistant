import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolist-reducer";
import {
    ResponseType,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistAPI,
    UpdateTaskModelType
} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../app/store";
import {TasksStateType} from "../../app/App";
import {setAppErrorAC, setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.id)
            };
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.taskId ? {...el, ...action.model} : el)
            };
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []};
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            return {
                ...state, [action.todolistId]: action.tasks
            }
        }
        default:
            return state;
    }
};

//Actions Creators

export const removeTaskAC = (todolistId: string, id: string) => ({type: 'REMOVE-TASK', todolistId, id} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskTitleAC = (todolistId: string, id: string, title: string) =>
    ({type: 'CHANGE-TASK-TITLE', todolistId, id, title} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomeinTaskModelType) =>
    ({type: 'UPDATE-TASK', todolistId, taskId, model} as const)
export const setTaskAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todolistId, tasks} as const)


//Thunk Creators

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType | SetStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTaskAC(todolistId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionType | SetErrorActionType | SetStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item));
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomeinTaskModelType) =>
    (dispatch: ThunkDispatch, getState: () => AppRootState) => {

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
                    dispatch(updateTaskAC(todolistId, taskId, domainModel))
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

type ActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType;


type ThunkDispatch = Dispatch<ActionType | SetErrorActionType | SetStatusActionType>