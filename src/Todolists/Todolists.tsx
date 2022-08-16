import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TasksType} from "../App";
import s from "./Todolist.module.css"

type TodolistType = {
    titleTodolist: string
    tasks: TasksType[]
    deleteTasks: (tasksId: string) => void
    changeFilter: (value: FilterType) => void
    filter: FilterType
    addTask: (title: string) => void
    checkedTask: (taskId: string, isDone: boolean) => void
}

export const Todolists: React.FC<TodolistType> = ({
                                                      titleTodolist,
                                                      tasks,
                                                      deleteTasks,
                                                      changeFilter,
                                                      filter,
                                                      addTask,
                                                      checkedTask
                                                  }) => {

    const onClickAll = () => changeFilter("all")
    const onClickActive = () => changeFilter("active")
    const onClickCompleted = () => changeFilter("completed")
    const styleActiveFilterAll = () => filter === "all" ? s.activeFilter : ""
    const styleActiveFilterActive = () => filter === "active" ? s.activeFilter : ""
    const styleActiveFilterCompleted = () => filter === "completed" ? s.activeFilter : ""

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onClickAddTask = () => {
        if (title.trim() !== "") {
            addTask(title)
            setTitle("")
        } else {
            setError("Maybe you?")
        }


    }
    const onChangeAddTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError("")
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddTask()
        }
    }

    return (
        <div>
            <h3>{titleTodolist}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeAddTask}
                    onKeyDown={onKeyDownAddTask}
                    className={error ? s.errorInput : ""}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div className={s.errorText}>{error}</div>}
            </div>
            <ul>
                {
                    tasks.map((t) => {
                        const onClickDeleteTasks = () => deleteTasks(t.id)
                        const onChangeCheckedBox = (e: ChangeEvent<HTMLInputElement>) => {
                            checkedTask(t.id, e.currentTarget.checked)
                        }
                        return (
                            <li className={t.isDone ? s.checkedTask : ""} key={t.id}><input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeCheckedBox}
                            /> <span>{t.title}</span>
                                <button onClick={onClickDeleteTasks}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={styleActiveFilterAll()} onClick={onClickAll}>All</button>
                <button className={styleActiveFilterActive()} onClick={onClickActive}>Active</button>
                <button className={styleActiveFilterCompleted()} onClick={onClickCompleted}>Completed</button>
            </div>
        </div>
    );
};
