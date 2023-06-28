import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    id: string
    addTask: (todolistId: string, title: string) => void

}
export const AddItemForm = (props: AddItemFormPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            props.addTask(props.id, newTaskTitle)
            setNewTaskTitle("")
        }
    };

    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(props.id, newTaskTitle.trim())
            setNewTaskTitle("")
        } else {
            setError("Title is requares")
        }

    }


    return (
        <div>
            <input value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="errorMessage">{error}</div>}
        </div>
    );
}
