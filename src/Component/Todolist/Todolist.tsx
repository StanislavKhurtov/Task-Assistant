import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "../../App";

export type TypeTask = {
	id: string,
	title: string,
	isDone: boolean
}


type PropsType = {
	title: string,
	tasks: TypeTask[],
	removeTask: (id: string) => void,
	changeFilter: (value: FilterValuesType) => void
	addTask: (title: string) => void


}

export const Todolist = (props: PropsType) => {

	const [newTaskTitle, setNewTaskTitle] = useState("");

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.charCode === 13) {
			props.addTask(newTaskTitle)
			setNewTaskTitle("")
		}
	}

	const addTask = () => {
		props.addTask(newTaskTitle)
		setNewTaskTitle("")
	}
	const onAllClickHandler = () => props.changeFilter("all");
	const onActiveClickHandler = () => props.changeFilter("active");
	const onCompletedClickHandler = () => props.changeFilter("completed");


	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input value={newTaskTitle}
					onChange={onChangeHandler}
					onKeyPress={onKeyPressHandler}
				/>
				<button onClick={addTask}>+
				</button>
			</div>
			<ol>
				{
					props.tasks.map(el => {
						const onRemoveHandler = () => props.removeTask(el.id);

						return (
							<li key={el.id}>
								<button onClick={onRemoveHandler}>x</button>
								<input type="checkbox" checked={el.isDone} />
								<span>{el.title}</span>
							</li>
						)
					})
				}
			</ol>
			<div>
				<button onClick={onAllClickHandler}>All
				</button>
				<button onClick={onActiveClickHandler}>Active
				</button>
				<button onClick={onCompletedClickHandler}>Completed
				</button>
			</div>
		</div>
	);
}