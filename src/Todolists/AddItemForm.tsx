import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./Todolist.module.css";

type AddItemFormPropsType = {
    id: string
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onClickAddTask = () => {
        if (title.trim() !== "") {
            props.addItem(title)
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
            <input
                value={title}
                onChange={onChangeAddTask}
                onKeyDown={onKeyDownAddTask}
                className={error ? s.errorInput : ""}
            />
            <button onClick={onClickAddTask}>+</button>
            {error && <div className={s.errorText}>{error}</div>}
        </div>
    )
}