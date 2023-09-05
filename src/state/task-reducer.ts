import { TasksStateType } from "../App";
import { _SetTodolistsActionType, AddTodolistActionType, RemoveTodolistActionType } from "./todolist-reducer";
import { TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType } from "../api/todolist-api";
import { Dispatch } from "redux";
import { AppRootState } from "./store";


export type RemoveTaskActionType = {
	type: 'REMOVE-TASK'
	todolistID: string
	id: string
};

export type AddTaskActionType = {
	type: 'ADD-TASK'
	todolistID: string
	task: TaskType
}

export type ChangeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLE'
	todolistID: string
	id: string
	title: string
}

export type ChangeTaskStatusActionType = {
	type: 'CHANGE-STATUS'
	todolistID: string
	id: string
	status: TaskStatuses
}


type ActionType =
	RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskTitleActionType
	| ChangeTaskStatusActionType
	| AddTodolistActionType
	| RemoveTodolistActionType
	| _SetTodolistsActionType
	| ReturnType<typeof setTaskAC>;

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK':
			return {
				...state,
				[action.todolistID]: state[action.todolistID].filter(task => task.id !== action.id)
			};
		case 'ADD-TASK': {
			return {
				...state,
				[action.todolistID]: [action.task, ...state[action.todolistID]]
			}
		}
		case 'CHANGE-STATUS': {
			return {
				...state,
				[action.todolistID]: state[action.todolistID].map(el => el.id === action.id ? {
					...el,
					status: action.status
				} : el)
			};
		}
		case 'CHANGE-TASK-TITLE': {
			return {
				...state,
				[action.todolistID]: state[action.todolistID].map(el => el.id === action.id ? {
					...el,
					title: action.title
				} : el)
			};
		}
		case 'SET-TASKS': {
			return {
				...state, [action.todolistId]: action.tasks
			}
		}
		case 'SET-TODOLISTS': {
			const stateCopy = { ...state }
			action.todolists.forEach((tl) => {
				stateCopy[tl.id] = []
			})
			return stateCopy;
		}
		case 'ADD-TODOLIST': {
			return { ...state, [action.todolist.id]: [] };
		}
		case 'REMOVE-TODOLIST': {
			const newState = { ...state };
			delete newState[action.id];
			return newState;
		}
		default:
			return state;
	}
};

export const removeTaskAC = (todolistId: string, id: string): RemoveTaskActionType => {
	return { type: 'REMOVE-TASK', todolistID: todolistId, id: id }
}

export const addTaskAC = (todolistId: string, task: TaskType): AddTaskActionType => {
	return { type: 'ADD-TASK', todolistID: todolistId, task }
}

export const changeTaskTitleAC = (todolistId: string, id: string, title: string): ChangeTaskTitleActionType => {
	return { type: 'CHANGE-TASK-TITLE', todolistID: todolistId, id: id, title: title }
}

export const changeTaskStatusAC = (todolistID: string, id: string, status: TaskStatuses): ChangeTaskStatusActionType => {
	return { type: 'CHANGE-STATUS', todolistID: todolistID, id: id, status }
}

export const setTaskAC = (todolistId: string, tasks: TaskType[]) => {
	return { type: 'SET-TASKS', todolistId, tasks } as const
}

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
	todolistAPI.getTask(todolistId)
		.then((res) => {
			dispatch(setTaskAC(todolistId, res.data.items))
		})
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
	todolistAPI.deleteTask(todolistId, taskId)
		.then(() => {
			dispatch(removeTaskAC(todolistId, taskId))
		})
}

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
	todolistAPI.createTask(todolistId, title)
		.then((res) => {
			dispatch(addTaskAC(todolistId, res.data.data))
		})
}

export const updateTaskTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootState) => {
	const task = getState().tasks[todolistId].find(el => el.id === taskId)

	if (task) {
		const model: UpdateTaskModelType = {
			title: task.title,
			startDate: task.startDate,
			priority: task.priority,
			description: task.description,
			deadline: task.deadline,
			status

		}
		todolistAPI.updateTask(todolistId, taskId, model)
			.then((res) => {
				dispatch(changeTaskStatusAC(todolistId, taskId, status))
			})
	}
}

