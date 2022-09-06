import {v1} from "uuid";
import {FilterType, TodolistsType} from "../../App";
import {
    AddTodolistAC,
    ChangeTodolistFilter,
    ChangeTodolistTitleAc,
    RemoveTodolistAC,
    TodolistsReduser
} from "./Todolists_Reducer";


test('correct todolists should be removed', () => {
    let todolistsOne = v1()
    let todolistsTwo = v1()

    const startState: TodolistsType[] = ([
        {id: todolistsOne, title: "Todolists_1", filter: "all"},
        {id: todolistsTwo, title: "Todolists_2", filter: "all"},
    ])

    const endState = TodolistsReduser(startState, RemoveTodolistAC(todolistsOne))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistsTwo)
});

test('correct todolist should be added', () => {
    let todolistsOne = v1()
    let todolistsTwo = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: TodolistsType[] = ([
        {id: todolistsOne, title: "Todolists_1", filter: "all"},
        {id: todolistsTwo, title: "Todolists_2", filter: "all"},
    ])

    const endState = TodolistsReduser(startState, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all");
});

test('correct todolist should change it`s name', () => {
    let todolistsOne = v1()
    let todolistsTwo = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: TodolistsType[] = ([
        {id: todolistsOne, title: "Todolists_1", filter: "all"},
        {id: todolistsTwo, title: "Todolists_2", filter: "all"},
    ])


    const endState = TodolistsReduser(startState, ChangeTodolistTitleAc(todolistsTwo,newTodolistTitle))

    expect(endState[0].title).toBe("Todolists_1");
    expect(endState[1].title).toBe(newTodolistTitle);

});

test('correct filter of todolist should be changed', () => {
    let todolistsOne = v1()
    let todolistsTwo = v1()

    let newFilter: FilterType = "completed"

    const startState: TodolistsType[] = [
        {id: todolistsOne, title: "Todolists_1", filter: "all"},
        {id: todolistsTwo, title: "Todolists_2", filter: "all"},
    ]

    const endState = TodolistsReduser(startState, ChangeTodolistFilter(todolistsTwo, newFilter))

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);

});