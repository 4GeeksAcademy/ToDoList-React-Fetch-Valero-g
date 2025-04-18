import React, { useEffect } from "react";
import { useState, useRef } from "react";

const ToDoList = () => {
     const [input, SetInput] = useState ("");
     const [numTasks, SetNumTasks] = useState (0);
     const [list, SetList] = useState ([]);

const handleKeyDown = (e) =>{
    if (e.key == "Enter" && input != ""){
        
        createTodo(input);
        
        SetInput("");
        //SetNumTasks( (prev) => prev+1);
        }
    }

useEffect(()=>{
        SetNumTasks(list.length);
    }, [list]);

const deleteTask= (e)=> {
    SetList(list.filter( (item) => e !=item));
    //if (numTasks >0) SetNumTasks( (prev) => prev-1);
    fetch(`https://playground.4geeks.com/todo/todos/${e.id}`, 
        {
            method: "DELETE"
            //headers: {
            //    "Content-Type": "application/json"
            //  },
            //body: JSON.stringify()
        }
    )

    .then( (res)=> console.log(res))
    //.then( (data)=> console.log(data))
    .catch( (err)=> console.log(err));
}


//API

const getUser = () => {
    fetch("https://playground.4geeks.com/todo/users/valero")

    .then( (res)=> 
            {if (!res.ok)createUser();
                else getToDos();
            console.log(res);
            res.json();})
    .then( (data)=> console.log(data))
    .catch( (err)=> console.log(err));
}
const createUser = () => {
    fetch("https://playground.4geeks.com/todo/users/valero", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify()
        }
    )

    .then( (res)=> res.json())
    .then( (data)=>console.log(data))
    .catch( (err)=> console.log(err));
}

const createTodo= (tarea) => {
    fetch(`https://playground.4geeks.com/todo/todos/valero`, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(
                {
                    label: tarea,
                    is_done: false
                  }
            )
        }
    )

    .then( (res)=> res.json())
    .then( (data)=> {
        SetList(()=> [...list, data]);
        console.log(data);})
    .catch( (err)=> console.log(err));
}


const getToDos = () => {
    fetch("https://playground.4geeks.com/todo/users/valero")

    .then( (res)=> res.json())
    .then( (data)=>  SetList(data.todos))
    .catch( (err)=> console.log(err));
}

useEffect ( ()=> getUser(),[])
//useEffect ( ()=> getToDos(),[])

    return (
        <div className = "d-flex flex-column w-75 m-5">
            <h1>Lista de tareas con fetch</h1>
            <div className = "lista w-75 p-0 m-0">
                <input className = "w-100" type = "text" onChange = { (e) => SetInput(e.target.value) } onKeyDown = {(e) => handleKeyDown(e)} value = {input} placeholder ="¡Añade una tarea!" maxLength="50"/>
                <ul>
                    {list.map((item) => <div className="d-flex flex-row justify-content-between w-100"><li className= "d-flex flex-row justify-content-between w-100"><p>{item.label}</p> <button className ="ms-auto" onClick={()=> deleteTask(item)}>X</button></li></div>)}
                    <li className = "Summary">{numTasks>0 ? `Quedan ${numTasks} tareas por completar` : "No quedan tareas, por favor añade tareas!"}</li>
                </ul>
            </div>
        </div>

    )
}

export default ToDoList;