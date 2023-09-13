import {setAppErrorAC, setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../app/app-reducer";
import {ResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
};

export const handleServerNetworkError = (error: {messages:string}, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) => {
    dispatch(dispatch(setAppErrorAC(error.messages ? error.messages : '')))
    dispatch(setAppStatusAC('failed'))
};

