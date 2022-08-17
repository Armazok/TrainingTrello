import React, {ChangeEvent} from 'react';
import {FilterType, TasksType} from "../App";
import s from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistType = {
    id: string
    titleTodolist: string
    tasks: TasksType[]
    deleteTasks: (tasksId: string, objTaskId: string) => void
    changeFilter: (value: FilterType, objTaskId: string) => void
    filter: FilterType
    addTask: (title: string, objTaskId: string) => void
    checkedTask: (taskId: string, isDone: boolean, objTaskId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, objTaskId: string) => void
    deleteTodolists: (objTaskId: string) => void
    changeTitleTodolists: (idTodolists: string, newTitle: string) => void
}

export const Todolists: React.FC<TodolistType> = ({
                                                      titleTodolist,
                                                      tasks,
                                                      deleteTasks,
                                                      changeFilter,
                                                      filter,
                                                      checkedTask,
                                                      id,
                                                      addTask,
                                                      deleteTodolists,
                                                      changeTaskTitle,
                                                      changeTitleTodolists
                                                  }) => {

    const onClickAll = () => changeFilter("all", id)
    const onClickActive = () => changeFilter("active", id)
    const onClickCompleted = () => changeFilter("completed", id)
    const styleActiveFilterAll = () => filter === "all" ? s.activeFilter : ""
    const styleActiveFilterActive = () => filter === "active" ? s.activeFilter : ""
    const styleActiveFilterCompleted = () => filter === "completed" ? s.activeFilter : ""

    const onClickRemoveTodolists = () => {
        deleteTodolists(id)
    }
    const addTasks = (title: string) => {
        addTask(title, id)
    }

    const replacementTitleTodolists = (newTitleTodolists: string) => {
        changeTitleTodolists(newTitleTodolists, id)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={titleTodolist} onChange={replacementTitleTodolists}/>
                <button onClick={onClickRemoveTodolists}>X</button>
            </h3>
            <AddItemForm
                id={id}
                addItem={addTasks}
            />
            <ul>
                {
                    tasks.map((t) => {
                        const onClickDeleteTasks = () => deleteTasks(t.id, id)
                        const onChangeCheckedBox = (e: ChangeEvent<HTMLInputElement>) => {
                            checkedTask(t.id, e.currentTarget.checked, id)
                        }
                        const onChangeTitleTask = (newValue: string) => {
                            changeTaskTitle(t.id, newValue, id)
                        }
                        return (
                            <li className={t.isDone ? s.checkedTask : ""} key={t.id}>
                                <input
                                    type="checkbox"
                                    checked={t.isDone}
                                    onChange={onChangeCheckedBox}
                                />
                                <EditableSpan
                                    title={t.title}
                                    onChange={onChangeTitleTask}
                                />
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










