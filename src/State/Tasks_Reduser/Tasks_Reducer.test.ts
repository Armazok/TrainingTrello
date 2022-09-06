import {objTasksType} from "../../App";
import {
    AddTasksAC,
    addTodolistsAC,
    changeTaskStatus,
    changeTaskTitle,
    removeTasksAC,
    TasksReduser
} from "./Tasks_Reducer";
import {RemoveTodolistAC} from "../Todolists_Reduser/Todolists_Reducer";


test('correct task should be deleted from correct array', () => {
    const startState: objTasksType = {
        'todolistsOne': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JavaScript", isDone: true},
            {id: '3', title: "Redux", isDone: false},
        ],
        'todolistsTwo': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JavaScript", isDone: false},
            {id: '3', title: "JavaScript", isDone: false},
        ],
    }

    const action = removeTasksAC('2', 'todolistsTwo')
    const endState = TasksReduser(startState, action)

    expect(endState['todolistsOne'].length).toBe(3)
    expect(endState['todolistsTwo'].length).toBe(2)

    expect(endState['todolistsTwo'].every(t => t.id !== '2')).toBeTruthy()

    expect(endState['todolistsTwo'][0].id).toBe('1')
    expect(endState['todolistsTwo'][1].id).toBe('3')

})

test('correct task should be add task ', () => {
    const startState: objTasksType = {
        'todolistsOne': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JavaScript", isDone: true},
            {id: '3', title: "Redux", isDone: false},
        ],
        'todolistsTwo': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JavaScript", isDone: false},
            {id: '3', title: "JavaScript", isDone: false},
        ],
    }

    const action = AddTasksAC('juice', "todolistsTwo")
    const endState = TasksReduser(startState, action)

    expect(endState['todolistsOne'].length).toBe(3)
    expect(endState['todolistsTwo'].length).toBe(4)
    expect(endState['todolistsTwo'][0].id).toBeDefined()
    expect(endState['todolistsTwo'][0].title).toBe('juice')
    expect(endState['todolistsTwo'][0].isDone).toBe(false)

})

test('checked status of specified task should be changed', () => {
    const startState: objTasksType = {
        'todolistsOne': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JavaScript", isDone: true},
            {id: '3', title: "Redux", isDone: false},
        ],
        'todolistsTwo': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JavaScript", isDone: true},
            {id: '3', title: "JavaScript", isDone: false},
        ],
    }

    const action = changeTaskStatus('2',false, "todolistsTwo")
    const endState = TasksReduser(startState, action)

    expect(endState['todolistsTwo'][1].isDone).toBe(false);
    expect(endState['todolistsOne'][1].isDone).toBe(true);

})

test('title of specified task should be changed', () => {
    const startState: objTasksType = {
        'todolistsOne': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JavaScript", isDone: true},
            {id: '3', title: "Redux", isDone: false},
        ],
        'todolistsTwo': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JavaScript", isDone: true},
            {id: '3', title: "JavaScript", isDone: false},
        ],
    }

    const action = changeTaskTitle('2','MilkyWay', "todolistsTwo")
    const endState = TasksReduser(startState, action)

    expect(endState['todolistsTwo'][1].title).toBe('MilkyWay');
    expect(endState['todolistsOne'][1].title).toBe('JavaScript');

})

test('new array should be added when new todolist is added ', () => {
    const startState: objTasksType = {
        'todolistsOne': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JavaScript", isDone: true},
            {id: '3', title: "Redux", isDone: false},
        ],
        'todolistsTwo': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JavaScript", isDone: true},
            {id: '3', title: "JavaScript", isDone: false},
        ],
    }

    const action = addTodolistsAC('title no matter')
    const endState = TasksReduser(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistsOne' && k != 'todolistsTwo')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test('property with todolistId should be deleted', () => {
    const startState: objTasksType = {
        'todolistsOne': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JavaScript", isDone: true},
            {id: '3', title: "Redux", isDone: false},
        ],
        'todolistsTwo': [
            {id: '1', title: "HTML&CSS", isDone: false},
            {id: '2', title: "JavaScript", isDone: true},
            {id: '3', title: "JavaScript", isDone: false},
        ],
    }

    const action = RemoveTodolistAC('todolistsTwo')

    const endState = TasksReduser(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistsTwo']).toBeUndefined()

})











