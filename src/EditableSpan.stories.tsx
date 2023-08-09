import React from "react";

import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {EditebleSpan} from "./EditebleSpan";


export default {
    title: 'EditebleSpan Component',
    component: EditebleSpan
}

//const callback = action('Button "add" was pressed inside the form')

const changeCallback  = action('Value changed')



export const EditebleSpanBaseExample = () => {
    return (
        <>
      <EditebleSpan title={'Start value'} onChange={changeCallback} />
        </>
    )
}