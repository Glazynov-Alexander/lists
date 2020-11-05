import "./App.css";
import React from "react";
import ContainerFooter from "./Containers/ContainerFooter";
import InputText from "./Components/InputText/InputText";
import ContainerTodoList from "./Containers/ContainerTodoList.jsx";

function App(props) {
  return (
    <div className="app">
      <header>
        <h1 className="titleApp">Todo list</h1>
      </header>

      <main className="todoList">
        <InputText createNewTask={props.createNewTask}/>

        {props.tasks.length !== 0 ? (
          <div>
            <ContainerTodoList />
            <ContainerFooter />
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;
