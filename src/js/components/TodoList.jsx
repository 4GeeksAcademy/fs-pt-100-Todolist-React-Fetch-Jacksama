import React, { useEffect, useState } from "react";

export const TodoList = ({listaDesdeAPI = []}) => {

    const [lista, setLista] = useState (listaDesdeAPI);
    const [tarea, setTarea] = useState ('');

    useEffect(()=>{
            if (listaDesdeAPI?.length >0) {
                setLista(listaDesdeAPI);
            }
        },[listaDesdeAPI])

    const añadirTarea = (e) => {
        setTarea(e.target.value);
    }

    const actualizarTarea = (e) => {
        e.preventDefault();
        if (tarea.trim()=== "") return;


        //const nuevaLista = [...lista, tarea];
        //setLista(nuevaLista);
        //setTarea("");
        sincronizadorConAPI();
    }

    const removerTarea = (id) => {
        fetch (`https://playground.4geeks.com/todo/todos/${id}`,{
            method: "DELETE"
        })

        .then(response => {
            if(response.ok){
        const nuevaLista = lista.filter((item) => item.id !== id);
            setLista(nuevaLista);  
            }
        }) 

        
    }
 
    const sincronizadorConAPI = () => {
        const url = "https://playground.4geeks.com/todo/todos/jacksama";
        const payload = {
            label: tarea,
            is_done: false
        };
        


    fetch(url, {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    .then(response => {
        if (response.ok) {
            console.log("Tareas sincronizadas con la API");
            return response.json()
        }
        else{
            console.error("Error al sincronizar con la API", response.status);
        }
    })

    .then(data =>{
        console.log(data)
        setLista([...lista, data])
        setTarea("")
    })

    .catch(error => console.error("Error en POST", error));

    };

    return (
        <>
            <div className="container p-3 text-center">
                <h2>MI LISTA</h2>
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
                            {e.label}
                        <span className="delete-btn" onClick={()=>removerTarea(e.id)}>🗑️</span>    
                    </li>
                    ))
                    )}
                </ul>
            </div>
        </>
    )
}