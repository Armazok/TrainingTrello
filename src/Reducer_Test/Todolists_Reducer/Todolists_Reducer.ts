import {FilterType, TodolistsType} from "../../App";
import {v1} from "uuid";

type ActionsTypes =
    RemoveTodolist |
    AddTodolists |
    ChangeTodolistTitle |
    ChangeTodolistFilter

export interface RemoveTodolist {
    type: 'REMOVE-TODOLIST'
    id: string
}
interface AddTodolists {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export interface ChangeTodolistTitle {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export interface ChangeTodolistFilter {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterType
}

export const TodolistsReduser = (state: TodolistsType[], action: ActionsTypes): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [
                {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(s => s.id === action.id ? {...s, title: action.title} : s)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(f => f.id === action.id ? {...f, filter: action.filter} : f)
        }

        default:
            throw new Error("I don`t understand this action type")
    }
}

export const removeTodolistAC = (id: string):RemoveTodolist => {
  return {type: 'REMOVE-TODOLIST', id}
}
export const addTodolistAC = (title: string):AddTodolists => {
  return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistTitleAC = (todolistsTwo: string, newTodolistTitle: string): ChangeTodolistTitle => {
  return {
      type: 'CHANGE-TODOLIST-TITLE',
      id: todolistsTwo,
      title: newTodolistTitle
  }
}
export const changeTodolistFilterAC = (todolistsTwo: string, newFilter: FilterType):ChangeTodolistFilter => {
  return {
      type: 'CHANGE-TODOLIST-FILTER',
      id: todolistsTwo,
      filter: newFilter }
}