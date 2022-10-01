import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
export default function TodoDetail(){
    const [todo, setTodo] = useState({})
    var [count, setCount] = useState(0)
    const {id} = useParams()
    
    useEffect( () => {
        axios.get(`http://127.0.0.1:8000/${id}`)
        .then( res => { 
            setTodo(res.data)})
        .catch(err => console.log(err))
    },[count])
    const updateTask = (e, id, completed) =>{
        const data = {'completed': !completed}
        axios.put(`http://127.0.0.1:8000/${id}`, data)
        .then( () => {
            setCount(count+=1);
            }).catch(error => {
            console.error('Something went wrong!', error);
            });  
    }
    return(
        <>
            <h3>Task ID: {todo.id}</h3>
            <h1>{todo.task}</h1>
            {todo.completed==true? (<><h3>Done</h3><button onClick={ e => updateTask(e, todo.id, todo.completed)}>Not Done</button></>):
             <><h3>Not Done</h3><button onClick={ e => updateTask(e, todo.id, todo.completed)}>Done Now</button></>}
            <Link to="/">Go Back</Link>
            
            
        </>
    )
}