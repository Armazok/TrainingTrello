import {FilterType, TodolistsType} from "../App";
import {v1} from "uuid";

type ActionsTypes =
    RemoveTodolist |
    AddTodolists |
    ChangeTodolistTitle |
    ChangeTodolistFilter

interface RemoveTodolist {
    type: 'REMOVE-TODOLIST'
    id: string
}
interface AddTodolists {
    type: 'ADD-TODOLIST'
    title: string
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
            return [...state, {
                id: v1(),
                title: action.title,
                filter: "all"
            }]
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

export const RemoveTodolistAC = (todolistsOne: string):RemoveTodolist => {
  return {type: 'REMOVE-TODOLIST', id: todolistsOne}
}

export const AddTodolistAC = (newTodolistTitle: string):AddTodolists => {
  return {type: 'ADD-TODOLIST', title: newTodolistTitle}
}

export const ChangeTodolistTitleAc = (todolistsTwo: string,newTodolistTitle: string): ChangeTodolistTitle => {
  return {
      type: 'CHANGE-TODOLIST-TITLE',
      id: todolistsTwo,
      title: newTodolistTitle
  }
}

export const ChangeTodolistFilter = (todolistsTwo: string, newFilter: FilterType):ChangeTodolistFilter => {
  return {
      type: 'CHANGE-TODOLIST-FILTER',
      id: todolistsTwo,
      filter: newFilter }
}