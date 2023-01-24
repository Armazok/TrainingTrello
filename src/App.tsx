import React, {useState} from 'react';
import './App.css';
import {Todolists} from "./Components/Todolists";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = "all" | "active" | "completed"
export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}
export type objTasksType = {
    [key: string]: TasksType[]
}

function App() {
    let todolistsOne = v1()
    let todolistsTwo = v1()

    const [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistsOne, title: "Todolists_1", filter: "all"},
        {id: todolistsTwo, title: "Todolists_2", filter: "all"},
    ])
    const [objTasks, setObjTasks] = useState<objTasksType>({
        [todolistsOne]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JavaScript", isDone: true},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "React", isDone: false},
        ],
        [todolistsTwo]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JavaScript", isDone: false},
        ],
    })

    function deleteTask(tasksId: string, objTaskId: string) {
        //  setTasks(tasks.filter(t => t.id !== tasksId))
        setObjTasks({...objTasks, [objTaskId]: objTasks[objTaskId].filter(t => t.id !== tasksId)})
    }

    function changeFilter(filter: FilterType, objTaskId: string) {
        setTodolists(todolists.map(t => t.id === objTaskId ? {...t, filter: filter} : t))
    }

    function addTask(title: string, objTaskId: string) {
        let sampleNewTask = {id: v1(), title: title, isDone: false}
        //  setTasks([sampleNewTask, ...tasks])
        setObjTasks({...objTasks, [objTaskId]: [sampleNewTask, ...objTasks[objTaskId]]})

    }

    function checkedTask(taskId: string, isDone: boolean, objTaskId: string) {
        //   setTasks(tasks.map(ch => ch.id === taskId ? {...ch, isDone} : ch))
        setObjTasks({...objTasks, [objTaskId]: objTasks[objTaskId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    function deleteTodolists(objTaskId: string) {
        setTodolists(todolists.filter(t => t.id !== objTaskId))

        delete objTasks[objTaskId]
        setObjTasks({...objTasks})

    }

    function addTodolists(title: string) {
        let sampleNewTodolists: TodolistsType = {id: v1(), title: title, filter: "all"}
        setTodolists([sampleNewTodolists, ...todolists])

        setObjTasks({...objTasks, [sampleNewTodolists.id]: []})
    }

    function changeTaskTitle(taskId: string, newTitle: string, objTaskId: string) {
        setObjTasks({...objTasks, [objTaskId]: objTasks[objTaskId].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        })
    }

    function changeTitleTodolists(newTitle: string, objTaskId: string) {
        let todo = todolists.find(tl => tl.id === objTaskId)
        if (todo) {
            todo.title = newTitle
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm id={"sdf"} addItem={addTodolists}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let FilterTasks = objTasks[tl.id]
                            if (tl.filter === "completed") {
                                FilterTasks = FilterTasks.filter(t => t.isDone)
                            }
                            if (tl.filter === "active") {
                                FilterTasks = FilterTasks.filter(t => !t.isDone)
                            }
                            return (
                               <Grid item>
                                   <Paper style={{padding: '10px'}}>
                                       <Todolists
                                           key={tl.id}
                                           id={tl.id}
                                           titleTodolist={tl.title}
                                           tasks={FilterTasks}
                                           deleteTasks={deleteTask}
                                           changeFilter={changeFilter}
                                           filter={tl.filter}
                                           addTask={addTask}
                                           checkedTask={checkedTask}
                                           deleteTodolists={deleteTodolists}
                                           changeTaskTitle={changeTaskTitle}
                                           changeTitleTodolists={changeTitleTodolists}
                                       />
                                   </Paper>
                               </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
