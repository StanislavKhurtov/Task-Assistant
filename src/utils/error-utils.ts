import {ResponseType} from "api/todolist-api";
import {Dispatch} from "redux";
import {appActions} from "app/app-reducer";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(appActions.setAppErrorAC({error: 'some error occurred'}))
    }
    dispatch(appActions.setAppStatusAC({status: 'failed'}))
};

export const handleServerNetworkError = (error: {messages:string}, dispatch: Dispatch) => {
    dispatch(dispatch(appActions.setAppErrorAC({error: error.messages ? error.messages : ''})))
    dispatch(appActions.setAppStatusAC({status: 'failed'}))
};

