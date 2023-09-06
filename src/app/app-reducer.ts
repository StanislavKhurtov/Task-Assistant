export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
export const initialstate: InitialStateType = {
    status: 'idle',
    error: 'Some Errorrrrrrr'
}

export const appReducer = (state: InitialStateType = initialstate, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)


// types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type ActionsType =
    ReturnType<typeof setErrorAC>
    | ReturnType<typeof setStatusAC>