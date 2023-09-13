export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
export const initialstate: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialstate, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-STATUS':
            return {...state, status: action.status}
        case 'SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'SET-STATUS', status} as const)


// types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>
type ActionsType =
    SetErrorActionType
    | SetStatusActionType