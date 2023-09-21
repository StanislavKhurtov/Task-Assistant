import {AnyAction, combineReducers} from "redux";
import {tasksReducer} from "../features/Todolists/task-reducer";
import {todolistsReducer} from "../features/Todolists/todolist-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: authReducer,
})

//export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})

export type AppRootState = ReturnType<typeof rootReducer>
export const useAppDispatch = () => useDispatch<ThunkType>()

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AnyAction>
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

export type ThunkType = ThunkDispatch<AppRootState, any, AnyAction>

// @ts-ignore
window.store = store