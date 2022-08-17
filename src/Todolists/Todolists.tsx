import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TasksType} from "../App";
import s from "./Todolist.module.css"

type TodolistType = {
    id: string
    titleTodolist: string
    tasks: TasksType[]
    deleteTasks: (tasksId: string, objTaskId: string) => void
    changeFilter: (value: FilterType, objTaskId: string) => void
    filter: FilterType
    addTask: (title: string, objTaskId: string) => void
    checkedTask: (taskId: string, isDone: boolean, objTaskId: string) => void
    deleteTodolists: (objTaskId: string) => void
}

export const Todolists: React.FC<TodolistType> = ({
                                                      titleTodolist,
                                                      tasks,
                                                      deleteTasks,
                                                      changeFilter,
                                                      filter,
                                                      addTask,
                                                      checkedTask,
                                                      id,
                                                      deleteTodolists
                                                  }) => {

    const onClickAll = () => changeFilter("all", id)
    const onClickActive = () => changeFilter("active", id)
    const onClickCompleted = () => changeFilter("completed", id)
    const styleActiveFilterAll = () => filter === "all" ? s.activeFilter : ""
    const styleActiveFilterActive = () => filter === "active" ? s.activeFilter : ""
    const styleActiveFilterCompleted = () => filter === "completed" ? s.activeFilter : ""

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onClickAddTask = () => {
        if (title.trim() !== "") {
            addTask(title, id)
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

    const onClickRemoveTodolists = () => {
        deleteTodolists(id)
    }

    return (
        <div>
            <h3>{titleTodolist}
                <button onClick={onClickRemoveTodolists}>X</button>
            </h3>
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
                        const onClickDeleteTasks = () => deleteTasks(t.id, id)
                        const onChangeCheckedBox = (e: ChangeEvent<HTMLInputElement>) => {
                            checkedTask(t.id, e.currentTarget.checked, id)
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
