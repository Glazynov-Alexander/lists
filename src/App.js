import "./App.css";
import TodoContainer from "./components/Todos/Container-Todo.jsx";
import React from "react";
import Form from "react-bootstrap/Form";
import FooterContainer from "./components/Footer/Container-Footer";

function App(props) {
  return (
    <div className="app">
      <header>
        <h1 style={{ margin: "15px auto", textAlign: "center" }}>Todo list</h1>
      </header>

      <main className={"todoList"}>
        <div style={{ padding: "15px" }}>
          <Form.Control
            className={
              "rounded-0 inputTodo  border-top-0 border-right-0 border-left-0"
            }
            onKeyDown={(e) => {
              props.createNewTask(e);
            }}
            placeholder="enter your task"
          />
        </div>
        {props.tasks.length !== 0 ? (
          <div>
            <TodoContainer />
            <FooterContainer />
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;
