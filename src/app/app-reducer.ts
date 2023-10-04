import {authAPI} from "api/todolist-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authActions} from "features/Login/auth-reducer";

export type InitialStateType = {
    // происходит ли сейчас взайимодействие с сервером
    status: RequestStatusType
    //если ошибка какая то глобальная произойдет - мы запишем текст ошибки сюда
    error: string | null
    // true когда приложение проинициализировалось (проверили юзера , найстройки получили)
    isInitialized: boolean
}
export const initializedAppTC = createAsyncThunk('app/initializedAppTC', async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedInAC({value: true}));
    }
    return
})

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
    },
    extraReducers: builder => {
        builder.addCase(initializedAppTC.fulfilled, state => {
            state.isInitialized = true
        })
    }
})
export const appReducer = slice.reducer;
export const appActions = slice.actions;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'






