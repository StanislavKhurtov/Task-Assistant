import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm call')
    let [newTitle, setNewTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = useCallback(() => {
        if (newTitle.trim() !== "") {
            props.addItem(newTitle.trim())
            setNewTitle("")
        } else {
            setError("Title is requared");
        }

    },[props.addItem]);

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) {
            setError(null)
        }
        if (newTitle.trim() !== "") {
            if (e.key === "Enter") {
                props.addItem(newTitle.trim())
                setNewTitle("")
            }
        } else {
            setError("Title is requared");
        }
    };

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value);

    return (
        <div>
            <TextField
                variant="outlined"
                label={"Type value"}
                value={newTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTask} color={'primary'}>
                <AddBox />
            </IconButton>
        </div>
    );
})