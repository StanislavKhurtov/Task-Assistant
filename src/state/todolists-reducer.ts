import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTotodlistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTotodlistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
export type ChangeTotodlistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionTypes =
    RemoveTodoListActionType
    | AddTotodlistActionType
    | ChangeTotodlistFilterActionType
    | ChangeTotodlistTitleActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: "all"}]

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId};
}

export const addTodolistAC = (title: string): AddTotodlistActionType => {
    return {type: 'ADD-TODOLIST', title};
}



