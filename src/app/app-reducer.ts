export type InitialStateType = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
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
export const setStatusAC = (status: 'idle' | 'loading' | 'succeeded' | 'failed') => ({type: 'APP/SET-STATUS', status} as const)


// types

type ActionsType =
    ReturnType<typeof setErrorAC>
    | ReturnType<typeof setStatusAC>