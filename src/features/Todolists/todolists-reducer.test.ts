import {v1} from 'uuid'
import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValueType,
    removeTodolistAC,
    setTodolistsAC, TodolistDomainType, todolistsReducer
} from "./todolist-reducer";
import {TodolistType} from "../../api/todolist-api";
import {RequestStatusType} from "../../app/app-reducer";


let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0,entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0,entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC({id: todolistId1}))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolist: TodolistType = {
        title: 'New Todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    }


    const endState = todolistsReducer(startState, addTodolistAC({todolist: todolist}))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(todolist.title)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    const action = changeTodolistTitleAC({id:todolistId2, title:newTodolistTitle})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValueType = 'completed'

    const action = changeTodolistFilterAC({id:todolistId2,filter: newFilter})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test('todolists should be added', () => {

    const action = setTodolistsAC({todolists: startState})

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})


test('correct entitystatus of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'loading'

    const action = changeTodolistEntityStatusAC({id:todolistId2, status: newStatus})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(newStatus)
})
