import {Dispatch} from "redux";
import {setIsLoggedInAC, SetIsLoginInType} from "../features/Login/login-reducer";
import {authAPI} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export const initialstate: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialstate, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-STATUS':
            return {...state, status: action.status}
        case 'SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)


//thunk


export const initializedAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
        debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));

        }
        else {
        }
            dispatch(setAppInitializedAC(true));
    })
}

export const logoutTC = () => (dispatch: ThunkDispatch ) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


// types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetInitializedActionType = ReturnType<typeof setAppInitializedAC>

type ActionsType =
    SetErrorActionType
    | SetStatusActionType
    | SetInitializedActionType

type ThunkDispatch = Dispatch<ActionsType | SetErrorActionType | SetStatusActionType | SetIsLoginInType>