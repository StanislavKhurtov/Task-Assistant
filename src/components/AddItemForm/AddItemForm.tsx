import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) =>{

    let [newTitle, setNewTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (newTitle.trim() !== "") {
            addItem(newTitle.trim())
            setNewTitle("")
        } else {
            setError("Title is requared");
        }
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) {
            setError(null)
        }
        if (newTitle.trim() !== "") {
            if (e.key === "Enter") {
                addItemHandler()
                setNewTitle("")
            }
        }
    };

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value);

    return (
        <div>
            <TextField
                disabled={disabled}
                variant="outlined"
                label={"Type value"}
                value={newTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton color='primary' onClick={() => addItem(newTitle)}  disabled={disabled} >
                <AddBox />
            </IconButton>
        </div>
    );
})