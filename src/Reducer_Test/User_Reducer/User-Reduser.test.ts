import {StateType, userReduser} from "./User-Reduser";

test(`user reducer should increment only age`, () => {
    const startState: StateType = {
        age: 20,
        childrenCount: 2,
        name: 'Dimych'
    }

    const endState = userReduser(startState, {type: "INCREMENT-AGE"})

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', () => {
    const startState: StateType = {
        age: 20,
        childrenCount: 2,
        name: 'Dimych'
    }

    const endTest = userReduser(startState, {type: "INCREMENT-CHILDREN-COUNT"})

    expect(endTest.childrenCount).toBe(3)
    expect(endTest.age).toBe(20)
});

test('user reducer should change name of user', () => {
    const startState = {
        name: 'Dimych',
        age: 20,
        childrenCount: 2
    }
    const newName = 'Victor'
    const endState = userReduser(startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe(newName);
});










