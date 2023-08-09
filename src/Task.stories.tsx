import React from "react";

import {Task} from "./Task";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Task Component',
    component: Task
}

//const callback = action('Button "add" was pressed inside the form')

const changeTaskStatusCallback  = action('Status changed')
const changeTaskTitleCallback  = action('Title changed')
const removeTaskCallback  = action('Task removed')


export const TaskBaseExample = () => {
    return (
        <>
            <Task
                changeStatus={changeTaskStatusCallback}
                changeTaskTitle={changeTaskTitleCallback}
                removeTask={removeTaskCallback}
                task={{id:'1',isDone:true, title: 'CSS'}}
                todolistId={'todolistId1'}
            />
            <Task
                changeStatus={changeTaskStatusCallback}
                changeTaskTitle={changeTaskTitleCallback}
                removeTask={removeTaskCallback}
                task={{id:'2',isDone:false, title: 'JS'}}
                todolistId={'todolistId2'}
            />
        </>
    )
}