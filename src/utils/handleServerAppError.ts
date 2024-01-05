// generic function

import { Dispatch } from 'redux'
import {ResponseType} from "api/todolist-api";
import {appActions} from "app/app-reducer";


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  data.messages.length
    ? dispatch(appActions.setAppErrorAC({ error: data.messages[0] }))
    : dispatch(appActions.setAppErrorAC({ error: 'Some error occurred' }))

  dispatch(appActions.setAppStatusAC({ status: 'failed' }))
}
