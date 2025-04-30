import React, { useEffect, useState } from "react";
import { TodoList } from "./TodoList.jsx";


//create your first component
const Home = () => {

	const [data, setData] = useState ()

	useEffect(()=>{
		let url ="https://playground.4geeks.com/todo/users/jacksama"
		let options = {
			method: "GET",
			//body: JSON.stringify(TodoList),
			headers: {
			"Content-Type": "application/json"
			}
	}//La estructura anterior varía un poco a la que explica Javi, pero me ha gutado más, así la entendí mucho mejor en la clase de Alexander @alesanchezr
		console.log(options)

		fetch(url, options)
	  
	  .then(respuesta => {
		  if (respuesta.status >=200 && respuesta.status <=300){
			console.log("El request ha sido ejecutado correctamente")
			return respuesta.json();
		  }
		  else{
			console.log(`Hubo un error ${respuesta.status} en el request`)
		  } 
	  })

	  .then(body => {
		console.log(`Este es el body del request`, body);
		setData(body.todos);
	  })

	  .catch(error => {
		  console.log("Error en el Fetch", error);
	  });
	},[])
	
	return (
		<div className="text-center">
			<TodoList listaDesdeAPI={data}/>
		</div>
	);

};


export default Home;