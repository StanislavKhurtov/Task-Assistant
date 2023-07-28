import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./task-reducer";
import {todolistsReducer} from "./todolist-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store