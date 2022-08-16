import React, {useState} from 'react';
import './App.css';
import {Todolists} from "./Todolists/Todolists";
import {v1} from "uuid";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = "all" | "active" | "completed"


function App() {
    const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JavaScript", isDone: true},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "React", isDone: false},
    ])

    function deleteTask(tasksId: string) {
        setTasks(tasks.filter(t => t.id !== tasksId))
    }
    function changeFilter(value: FilterType) {
        setFilter(value)
    }
    function addTask(title: string) {
        let sampleNewTask = {id: v1(), title: title, isDone: false}
        setTasks([sampleNewTask, ...tasks])
    }
    function checkedTask(taskId: string, isDone: boolean) {
        setTasks(tasks.map(ch => ch.id === taskId ? {...ch, isDone} : ch))
    }


    let [filter, setFilter] = useState<FilterType>("all")
    let FilterTasks = tasks
    if (filter === "completed") {
        FilterTasks = tasks.filter(t => t.isDone)
    }
    if (filter === "active") {
        FilterTasks = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">
            <Todolists
                titleTodolist="Who want to be king!"
                tasks={FilterTasks}
                deleteTasks={deleteTask}
                changeFilter={changeFilter}
                filter={filter}
                addTask={addTask}
                checkedTask={checkedTask}
            />
        </div>
    );
}

export default App;
