import {TasksStateType} from "../App";
import {v1} from "uuid";
import {_SetTodolistsType, AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistID: string
    id: string
};

export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistID: string
    title: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistID: string
    id: string
    title: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS'
    todolistID: string
    id: string
    status: TaskStatuses
}

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | _SetTodolistsType;

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.id)
            };
        case 'ADD-TASK': {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todolistId: action.todolistID,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
            return {
                ...state,
                [action.todolistID]: [...state[action.todolistID], newTask]
            };
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.id ? {
                    ...el,
                    status: action.status
                } : el)
            };
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(el => el.id === action.id ? {
                    ...el,
                    title: action.title
                } : el)
            };
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []};
        }
        case 'REMOVE-TODOLIST': {
            const newState = {...state};
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
};

export const removeTaskAC = (todolistId: string, id: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistID: todolistId, id: id}
}

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistID: todolistId, title: title}
}

export const changeTaskTitleAC = (todolistId: string, id: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistID: todolistId, id: id, title: title}
}

export const changeTaskStatusAC = (todolistID: string, id: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-STATUS', todolistID: todolistID, id: id, status}
}