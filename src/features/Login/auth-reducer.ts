import {authAPI, LoginParamsType} from "api/todolist-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "utils";

interface ErrorType {
    messages: string;
}

export const loginTC = createAsyncThunk('auth/login', async (param: LoginParamsType, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appActions.setAppStatusAC({status: 'loading'}))
    const res = await authAPI.login(param)
    try {
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (error: unknown) {
        handleServerNetworkError(error as ErrorType, dispatch);
        return rejectWithValue({errors: res.data.messages, fieldsErrors: undefined})
    }
})
export const logoutTC = createAsyncThunk('auth/logoutTC', async (param, thunkAPI) => {
    const {dispatch} = thunkAPI
    dispatch(appActions.setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (error) {
        handleServerNetworkError(error as ErrorType, dispatch);
    }
})

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginTC.fulfilled, state => {
                state.isLoggedIn = true
            })
            .addCase(logoutTC.fulfilled, state => {
                state.isLoggedIn = false
            })
    }
})

export const authReducer = slice.reducer;
export const authActions = slice.actions;











