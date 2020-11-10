import "./App.css";
import React from "react";
import ContainerFooter from "./Containers/ContainerFooter";
import InputText from "./Components/InputText/";
import ContainerTodoList from "./Containers/ContainerTodoList.jsx";
import {Route} from "react-router";

function App(props) {


  return (
    <div className="app">

      <header>
        <h1 className="titleApp">Todo list</h1>
      </header>

      <Route  path="/Tasks" render={() => (
          <main className="todoList">
              <InputText symbol={props.symbol} createNewTask={props.createNewTask}/>

              {props.tasks.length !== 0 ? (
                  <div>
                      <ContainerTodoList />
                      <ContainerFooter />
                  </div>
              ) : null}
          </main>
      )} />
    </div>
  );
}

export default App;
