import {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {action} from "@storybook/addon-actions";
import {EditebleSpan} from "./EditebleSpan";

const meta: Meta<typeof EditebleSpan> = {
    title: 'TODOLISTS/EditebleSpan',
    component: EditebleSpan,
    tags: ['autodocs'],
    args: {
        title: 'Вводи Клик',
        onChange: action( "onChange")
    },
};

export default meta;
type Story = StoryObj<typeof EditebleSpan>;


export const EditebleSpanStory: Story = {}




