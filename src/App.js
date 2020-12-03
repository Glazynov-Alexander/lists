import "./App.css";
import React, {useEffect} from "react";
import ContainerFooter from "./Containers/ContainerFooter";
import InputText from "./Components/InputText/";
import ContainerTodoList from "./Containers/ContainerTodoList.jsx";
import {Button} from "react-bootstrap";

function App(props) {
    let logOut = () => {
        props.logOutUse()
        props.history.push('/registration')
    }
    useEffect(() => {
        if (props.user && !props.tasks) {
            props.getTasksLocal(props.user._id ? props.user._id : null);
        }
    }, [props])

    if (props.user) {
        return (<div className="app">
                <header>
                    <h1 className="titleApp">Todo list</h1>
                    <Button variant="dark" className="logOut"
                            onClick={logOut}>Log out</Button>
                </header>
                <main className="todoList">
                    <InputText symbol={props.user._id} createNewTask={props.createNewTaskLocal}/>
                    {props.tasks && props.tasks.length !== 0 ? (
                        <div>
                            <ContainerTodoList/>
                            <ContainerFooter/>
                        </div>
                    ) : null}
                </main>
            </div>
        );
    }
    return null
}

export default App;
