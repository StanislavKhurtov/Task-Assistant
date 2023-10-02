import {authAPI, LoginParamsType} from "api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "app/app-reducer";
import {AppThunk} from "app/store";
import {todolistsActions} from "features/Todolists/todolist-reducer";

interface ErrorType {
    messages: string;
}


export const loginTC = createAsyncThunk('auth/login', async (param: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatusAC({status: 'loading'}))
    const res = await authAPI.login(param)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatusAC({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (error: unknown) {
        handleServerNetworkError(error as ErrorType, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: undefined})
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
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        })
    }
})
export const authReducer = slice.reducer;
export const authActions = slice.actions;


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







