import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {v1} from "uuid";
import {Task} from "./Task";

const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        // changeStatus: action('changeStatus'),
        // changeTaskTitle: action('changeTaskTitle'),
        // removeTask: action('remove task'),
        task: {id: v1(), title: "JS", isDone: true},
        todolistId: v1()
    },
    argTypes: {
        changeStatus: {
            description: 'qeewreg',
            action: 'clicked'
        },
        changeTaskTitle: {
            description: 'qeewreg',
            action: 'clicked'
        },
        removeTask: {
            description: 'qeewreg',
            action: 'clicked'
        },
    }
};

export default meta;
type Story = StoryObj<typeof Task>;


export const TaskIsDoneStory: Story = {}

export const TaskIsNotDoneStory: Story = {
    args: {
        task: {id: v1(), title: "CSS", isDone: false},
    }
}


