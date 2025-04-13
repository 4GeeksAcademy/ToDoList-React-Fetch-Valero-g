import React, { useEffect } from "react";
import { useState, useRef } from "react";

const ToDoList = () => {
     const [input, SetInput] = useState ("");
     const [numTasks, SetNumTasks] = useState (0);
     const [list, SetList] = useState ([]);

const handleKeyDown = (e) =>{
    if (e.key == "Enter" && input != ""){
        SetList(()=> [...list, input]);
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
}

    return (
        <div className = "d-flex flex-column w-50 m-5">
            <h1>Lista de tareas</h1>
            <div className = "lista w-75 p-0 m-0">
                <input className = "w-100" type = "text" onChange = { (e) => SetInput(e.target.value) } onKeyDown = {(e) => handleKeyDown(e)} value = {input} placeholder ="¡Añade una tarea!"/>
                <ul>
                    {list.map((item) => <div className="d-flex flex-row justify-content-between w-100"><li className= "d-flex flex-row justify-content-between w-100"><p>{item}</p> <button className ="ms-auto" onClick={()=> deleteTask(item)}>X</button></li></div>)}
                    <li className = "Summary">{numTasks>0 ? `Quedan ${numTasks} tareas por completar` : "No quedan tareas, por favor añade tareas!"}</li>
                </ul>
            </div>
        </div>

    )
}

export default ToDoList;