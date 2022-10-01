import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import axios from 'axios'
export default function Todolist(){
    const [todo, setTodo] = useState([])
    var [count, setCount] = useState(0)
    const [task, setTask] = useState('')

    

    useEffect( () => {
        axios.get('http://127.0.0.1:8000/')
        .then( res => {setTodo(res.data);})
        .catch(err => console.log(err))
    },[count])
    const addTask = (e) => {
        e.preventDefault()
        if (task == ""){
            alert("please write a task name")
            return
        }
        console.log(task)
        const data= {'task': task, 'completed': false}
        axios.post('http://127.0.0.1:8000/', data)
        .then( () => {
        setCount(count+=1);
        }).catch(error => {
        console.error('Something went wrong!', error);
        });   
    }
    const updateTask = (e, id, completed) =>{
        const data = {'completed': !completed}
        axios.put(`http://127.0.0.1:8000/${id}`, data)
        .then( () => {
            setCount(count+=1);
            }).catch(error => {
            console.error('Something went wrong!', error);
            });  
    }
    const deleteTask = (e, id) =>{
        axios.delete(`http://127.0.0.1:8000/${id}`)
        .then( () => {
            setCount(count+=1);
            }).catch(error => {
            console.error('Something went wrong!', error);
            });  
    }
    return (
        <>
            <h2>Todo List</h2>
            <table>
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Task Name</th>
                    <th scope="col">Done</th>
                    </tr>
                </thead>
                <tbody>
                    {todo.map(task => (
                    <tr key={task.id}>
                        <th scope="row">{task.id}</th>
                        <td><Link to={"/details/"+task.id}>{task.task}</Link></td>
                        {task.completed==true? (<td>Completed <button onClick={ e => updateTask(e, task.id, task.completed)}>Not Done</button></td>)
                        : <td>Not Done <button onClick={ e => updateTask(e, task.id, task.completed)}>Done Now</button></td>
                        }
                        <td><button onClick={ e => deleteTask(e, task.id)}>Delete</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <form onSubmit={addTask}>
                <label htmlFor="task">AddTask</label>
                <input type="text" id="task" placeholder="Task Name" onChange={e => setTask(e.target.value)}></input>
                <input type="submit"/>
            </form>
        </>
    )
}