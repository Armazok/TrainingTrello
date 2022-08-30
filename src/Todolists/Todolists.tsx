import React, {ChangeEvent} from 'react';
import {FilterType, TasksType} from "../App";
import s from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
    const styleActiveFilterAll = () => filter === "all" ? "contained" : "text"
    const styleActiveFilterActive = () => filter === "active" ? "contained" : "text"
    const styleActiveFilterCompleted = () => filter === "completed" ? "contained" : "text"

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
                <IconButton onClick={onClickRemoveTodolists}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm
                id={id}
                addItem={addTasks}
            />
            <div>
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
                            <div className={t.isDone ? s.checkedTask : ""} key={t.id}>
                                <Checkbox
                                    checked={t.isDone}
                                    onChange={onChangeCheckedBox}
                                />
                                <EditableSpan
                                    title={t.title}
                                    onChange={onChangeTitleTask}
                                />
                                <IconButton onClick={onClickDeleteTasks}>
                                    <Delete/>
                                </IconButton>
                             </div>
                        )
                    })
                }
            </div>
            <div>
                <Button style={{marginTop: "13px"}} variant={styleActiveFilterAll()} onClick={onClickAll}>All</Button>
                <Button style={{marginTop: "13px"}} color={'primary'} variant={styleActiveFilterActive()} onClick={onClickActive}>Active</Button>
                <Button style={{marginTop: "13px"}} color={'secondary'} variant={styleActiveFilterCompleted()} onClick={onClickCompleted}>Completed</Button>
            </div>
        </div>
    );
};










