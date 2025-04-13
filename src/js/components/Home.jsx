import React from "react";
import ToDoList from "./ToDoList";


//create your first component
const Home = () => {
	return (
		<div className="container d-flex justify-content-center">
			<ToDoList/>
		</div>
	);
};

export default Home;