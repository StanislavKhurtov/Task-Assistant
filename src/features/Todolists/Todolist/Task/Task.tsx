import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditebleSpan} from "../../../../components/EditableSpan/EditebleSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";

type TaskPropsType = {
    changeStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, id: string, newValue: string) => void
    removeTask: (todolistID: string, id: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {

    const removeTask = useCallback(() => props.removeTask(props.todolistId, props.task.id),[props.todolistId, props.task.id]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.todolistId, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    },[props.todolistId, props.task.id])

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newValue)
    },[props.changeTaskTitle,props.todolistId,props.task.id])

    return  <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "isDone" : ''}>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                onChange={onChangeHandler}
            />
            <EditebleSpan title={props.task.title} onChange={onChangeTitleHandler}/>
            <IconButton size="small" onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
})