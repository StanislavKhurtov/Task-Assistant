import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
};

export const handleServerNetworkError = (error: {messages:string}, dispatch: Dispatch) => {
    dispatch(dispatch(setAppErrorAC({error: error.messages ? error.messages : ''})))
    dispatch(setAppStatusAC({status: 'failed'}))
};

