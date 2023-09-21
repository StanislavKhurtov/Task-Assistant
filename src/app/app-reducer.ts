import {authAPI} from "api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsActions} from "features/Todolists/todolist-reducer";
import {AppThunk} from "./store";
import {authActions} from "features/Login/auth-reducer";

export type InitialStateType = {
    // происходит ли сейчас взайимодействие с сервером
    status: RequestStatusType
    //если ошибка какая то глобальная произойдет - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера , найстройки получили)
    isInitialized: boolean
}
export const initialstate: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialstate,
    reducers: {
        setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized;
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
    }
})
export const appReducer = slice.reducer;
export const appActions = slice.actions;
//thunk
export const initializedAppTC = ():AppThunk => (dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedInAC({value: true}));

            } else {
            }
            dispatch(appActions.setAppInitializedAC({isInitialized: true}));
        })
}
export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(appActions.setAppStatusAC({status:'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authActions.setIsLoggedInAC({value: false}))
                dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
                dispatch(todolistsActions.clearTodosDataAC({}))
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






