import React, { useEffect, useState } from "react";

export const TodoList = () => {

    const [lista, setLista] = useState ([]);
    const [tarea, setTarea] = useState ('');

    const añadirTarea = nuevatarea => {
        setTarea(nuevatarea.target.value);
        console.log(tarea)
    }

    const actualizarTarea = nuevalista => {
        nuevalista.preventDefault()
        setLista([...lista, tarea])
        setTarea('');
    }

    const removerTarea = tareaeliminada => {
        setLista(lista.filter((__, index) => index !== tareaeliminada));
    }

    useEffect(()=>{
        console.log(lista)
    }
    ,[lista])

    return (
        <>
            <div className="container p-3 text-center">
                <h2 fs-1>MI LISTA</h2>
                </div> 

                <div className="card">
                <form onSubmit={actualizarTarea} className="d-flex gap-2 mb-3">
                <input 
                type="text"
                placeholder="Añade una tarea"
                value={tarea}
                onChange={añadirTarea}
                />

                </form>
                
                <ul className="list-group">
                    {lista.length === 0 ?(
                        <li className="list-group-item text-center text-muted fst-italic">
                        No hay tareas, añadir tareas.
                        </li>

                    ):(

                    lista.map((e, index)=>(
                        <li key={index} className="list-group-item d-flex justify-content-between delete-icon">
                            {e}
                        <span className="delete-btn" onClick={()=>removerTarea(index)}>🗑️</span>    
                    </li>
                    ))
                    )}
                </ul>
            </div>
        </>
    )
}