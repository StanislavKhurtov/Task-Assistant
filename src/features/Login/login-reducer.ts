import {TasksStateType} from "../../app/App";
import {Dispatch} from "redux";
import {setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState: InitialStateType = {
    isLoggedIn: false
};

export const loginReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state;
    }
};

//Actions Creators

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)


//Thunk Creators

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }

        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })

}

//


type InitialStateType = {
    isLoggedIn: boolean
}

export type SetIsLoginInType = ReturnType<typeof setIsLoggedInAC>

type ActionType = SetIsLoginInType | SetStatusActionType | SetErrorActionType


