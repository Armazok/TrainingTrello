import {objTasksType} from "../../App";
import {v1} from "uuid";
import {RemoveTodolist} from "../Todolists_Reducer/Todolists_Reducer";

type ActionsTypes = RemoveTasks | AddTask | ChangeTaskStatus | ChangeTaskTitle | AddTodolists | RemoveTodolist

interface RemoveTasks {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

interface AddTask {
    type: 'ADD_TASK'
    todolistId: string
    title: string
}

interface ChangeTaskStatus {
    type: "CHANGE-TASK-STATUS"
    taskId: string,
    isDone: boolean,
    todolistsTwo: string
}

interface ChangeTaskTitle {
    type: "CHANGE-TASK-TITLE"
    taskId: string,
    title: string,
    todolistsTwo: string
}

interface AddTodolists {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}


export const TasksReduser = (state: objTasksType, action: ActionsTypes): objTasksType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case 'ADD_TASK':
            let sampleNewTask = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [sampleNewTask, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistsTwo]: state[action.todolistsTwo].map( t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistsTwo]: state[action.todolistsTwo].map( t => t.id === action.taskId ? {...t, title: action.title} : t)
            }
        }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don`t understand this type")
    }
}

export const removeTasksAC = (taskId: string, todolistId: string): RemoveTasks => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTasksAC = (title: string, todolistId: string): AddTask => {
    return {type: 'ADD_TASK', todolistId, title}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistsTwo: string): ChangeTaskStatus => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistsTwo}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistsTwo: string) : ChangeTaskTitle => {
    return { type: "CHANGE-TASK-TITLE", taskId, title, todolistsTwo}
}
export const addTodolistsAC = (title: string): AddTodolists => {
    return {type: "ADD-TODOLIST", title, todolistId: v1()}
}










