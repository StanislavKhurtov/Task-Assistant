import React from 'react'
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {v1} from "uuid";
import {tasksReducer} from "../state/task-reducer";
import {todolistsReducer} from "../state/todolist-reducer";
import {AppRootState} from "../state/store";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all",addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all",addedDate: '', order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                todolistId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low},
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                todolistId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low}
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                todolistId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low},
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.Completed,
                todolistId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}