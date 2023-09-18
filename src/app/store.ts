import {AnyAction, combineReducers} from "redux";
import {tasksReducer} from "../features/Todolists/task-reducer";
import {todolistsReducer} from "../features/Todolists/todolist-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {loginReducer} from "../features/Login/login-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer,
})

//export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})

export type AppRootState = ReturnType<typeof rootReducer>
export const useAppDispatch = () => useDispatch<ThunkType>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

export type ThunkType = ThunkDispatch<AppRootState, any, AnyAction>

// @ts-ignore
window.store = store