import {objTasksType, TodolistsType} from "../../App";
import {TasksReduser} from "../Tasks_Reduser/Tasks_Reducer";
import {AddTodolistAC, TodolistsReduser} from "../Todolists_Reduser/Todolists_Reducer";

test('ids should eb equals', () => {
    const startTaskState: objTasksType = {};
    const startTodolistsState: TodolistsType[] = [];

    const action = AddTodolistAC('title no matter')

    const endTaskState = TasksReduser(startTaskState, action)
    const endTodolistState = TodolistsReduser(startTodolistsState, action)

    const keys = Object.keys(endTaskState)
    const idFromTasks = keys[0]
    const idFormTodolists = endTodolistState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFormTodolists).toBe(action.todolistId)
});