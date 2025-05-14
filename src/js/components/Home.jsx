import React, { useEffect, useState } from "react";
import { TodoList } from "./TodoList.jsx";

//create your first component
const Home = () => {
  const [data, setData] = useState();

  useEffect(() => {
    let url = "https://playground.4geeks.com/todo/users/jacksama";
    let options = {
      method: "GET",
      //body: JSON.stringify(TodoList),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, options)
      .then((respuesta) => {
        if (respuesta.ok) {
          console.log("Usuario encontrado");
          return respuesta.json();
        } else if (respuesta.status === 404) {
          console.log("Usuario no encontrado. Creando...");
          return fetch(url, {
            method: "POST",
            headers: {
              "content-Type": "aplication/jason",
            },
          }).then((res) => {
            if (res.ok) {
              console.log("Usuario creado exitosamente.");
              return { todos: [] };
            } else {
              throw new Error("Error al crear el usuario.");
            }
          });
        } else {
          throw new Error(`Error al buscar usuario: ${respuesta.status}`);
        }
      })

      .then((body) => {
        console.log("Tareas obtenidas", body);
        setData(body.todos);
      })

      .catch((error) => {
        console.log("Error en el Fetch", error);
      });
  }, []);

  return (
    <div className="text-center">
      <TodoList listaDesdeAPI={data} />
    </div>
  );
};

export default Home;
