import {objTasksType, TodolistsType} from "../../App";
import {TasksReduser} from "../Tasks_Reducer/Tasks_Reducer";
import {addTodolistAC, TodolistsReduser} from "../Todolists_Reducer/Todolists_Reducer";

test('ids should eb equals', () => {
    const startTaskState: objTasksType = {};
    const startTodolistsState: TodolistsType[] = [];

    const action = addTodolistAC('title no matter')

    const endTaskState = TasksReduser(startTaskState, action)
    const endTodolistState = TodolistsReduser(startTodolistsState, action)

    const keys = Object.keys(endTaskState)
    const idFromTasks = keys[0]
    const idFormTodolists = endTodolistState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFormTodolists).toBe(action.todolistId)
});