import {Meta, StoryObj} from "@storybook/react";
import {action} from '@storybook/addon-actions'
import React from "react";
import {AddItemForm} from "./AddItemForm";

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


export const AddItemFormDisableExample = (props: any) => {
    return (<AddItemForm disabled={true}
        addItem={action('Button inside form clicked')}
/>)
}


