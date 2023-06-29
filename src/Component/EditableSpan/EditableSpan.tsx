import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue:string) => void
}


export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [nTitle, setNTitle] = useState("")

    const activeEditMode = () => {
        setEditMode(true);
        setNTitle(props.title);
    };

    const activeViewMode = () => {
        setEditMode(false);
        props.onChange(nTitle);

    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNTitle(e.currentTarget.value);


    return (
        editMode
            ? <input
                autoFocus
                value={nTitle}
                onChange={onChangeTitleHandler}
                onBlur={activeViewMode}/>
            : <span onDoubleClick={activeEditMode}>{props.title}</span>
    );
}