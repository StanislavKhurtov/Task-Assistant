import React from 'react';
import './App.css';
import {Todolist, TypeTask} from "./Component/Todolist/Todolist";

const App = () => {

    let tasks1: Array<TypeTask> = [
        {id: 1, title: "Html&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]
    let tasks2: Array<TypeTask> = [
        {id: 1, title: "Terminator", isDone: true},
        {id: 2, title: "XXX", isDone: false},
        {id: 3, title: "John Wisk", isDone: false}
    ]


    return (
        <div className="App">
            <Todolist title="What to Learn" tasks={tasks1}/>
            <Todolist title="Movies" tasks={tasks2}/>

        </div>
    );
}

export default App;
