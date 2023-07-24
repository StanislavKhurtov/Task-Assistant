import {TaskStateType} from "../App";
import {v1} from "uuid";

export type RemoveTasksActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    idTask: string

}
export type AddTasksActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    newTitle: string

}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    isDone: boolean
}

type ActionTypes =
    RemoveTasksActionType
    | AddTasksActionType
    | ChangeTaskTitleActionType
 | ChangeTaskStatusActionType

export const tasksReducer = (state: TaskStateType, action: ActionTypes): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.idTask)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {...el, isDone: action.isDone} : el)}
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.newTitle
                } : el)
            }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTasksAC = (todolistId: string, idTask: string): RemoveTasksActionType => {
    return {type: 'REMOVE-TASK', todolistId: todolistId, idTask: idTask};
}

export const addTaskAC = (todolistId: string, title: string): AddTasksActionType => {
    return {type: 'ADD-TASK', todolistId: todolistId, title};
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId: todolistId, taskId: taskId, isDone:isDone};
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId: todolistId, taskId: taskId, newTitle: newTitle};
}


