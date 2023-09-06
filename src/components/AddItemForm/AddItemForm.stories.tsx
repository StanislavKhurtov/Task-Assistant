import {Meta, StoryObj} from "@storybook/react";
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Click button inside form',
            action: 'Clicked button inside form'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;


export const AddItemFormStory: Story = {
    args: {
        addItem: action('Clicked button inside form')
    }
}

const AddItemFormWithError = (args: AddItemFormPropsType) => {
    let [newTitle, setNewTitle] = useState("")
    let [error, setError] = useState<string | null>("Title is requared")

    const addItem = () => {
        if (newTitle.trim() !== "") {
            args.addItem(newTitle.trim())
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
                args.addItem(newTitle.trim())
                setNewTitle("")
            }
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
            <IconButton onClick={addItem} color={'primary'}>
                <AddBox />
            </IconButton>
        </div>
    );
}

export const AddItemFormWithErrorStory: Story = {
    render: args => <AddItemFormWithError addItem={args.addItem} />
}
