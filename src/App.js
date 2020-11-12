import "./App.css";
import React from "react";
import ContainerFooter from "./Containers/ContainerFooter";
import InputText from "./Components/InputText/";
import ContainerTodoList from "./Containers/ContainerTodoList.jsx";
import {Route} from "react-router";
import {Button} from "react-bootstrap";

function App(props) {
    let logOut = () => {
        localStorage.clear()
        props.history.push('/Registration')
        window.location.reload();
    }

    return (
            <Route path="/Tasks" render={() => (
                <div className="app">
                    <header>
                        <h1 className="titleApp">Todo list</h1>
                        <Button variant="dark" className="logOut" onClick={() => { logOut()} }>Log out</Button>
                    </header>
                    <main className="todoList">
                        <InputText symbol={props.symbol} createNewTask={props.createNewTask}/>

                        {props.tasks.length !== 0 ? (
                            <div>
                                <ContainerTodoList/>
                                <ContainerFooter/>
                            </div>
                        ) : null}
                    </main>
                </div>
            )}/>
    );
}

export default App;
