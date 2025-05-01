import React, { useEffect, useState } from "react";

export const TodoList = ({listaDesdeAPI = []}) => {

    const [lista, setLista] = useState (listaDesdeAPI);
    const [tarea, setTarea] = useState ('');

    useEffect(()=>{
            if (listaDesdeAPI?.length >0) {
                setLista(listaDesdeAPI.map(item => item.label));
            }
        },[listaDesdeAPI])

    const añadirTarea = (e) => {
        setTarea(e.target.value);
    }

    const actualizarTarea = (e) => {
        e.preventDefault();
        if (tarea.trim()=== "") return;


        const nuevaLista = [...lista, tarea];
        setLista(nuevaLista);
        setTarea("");
        sincronizadorConAPI(nuevaLista);
    }

    const removerTarea = (index) => {
        const nuevaLista = lista.filter((__, i) => i !== index);
        setLista(nuevaLista);
        sincronizadorConAPI(nuevaLista);
    }
 
    const sincronizadorConAPI = () => {
        const url = "https://playground.4geeks.com/todo/users/jacksama";
        const payload = lista.map(t => ({
            label: t,
            done: false
        }));


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
        }
        else{
            console.error("Error al sincronizar con la API", response.status);
        }
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