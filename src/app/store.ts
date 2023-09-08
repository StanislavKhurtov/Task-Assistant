import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../features/Todolists/task-reducer";
import {todolistsReducer} from "../features/Todolists/todolist-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootState = ReturnType<typeof rootReducer>

export type ThunkType = ThunkDispatch<AppRootState, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkType>()

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

// @ts-ignore
window.store = store