import "./App.css";
import React from "react";
import ContainerFooter from "./Containers/ContainerFooter";
import InputText from "./Components/InputText/";
import ContainerTodoList from "./Containers/ContainerTodoList.jsx";
import {Button, Spinner} from "react-bootstrap";

function App(props) {
    let logOut = () => {
        localStorage.removeItem('user')
        props.history.push('/registration')
        window.location.reload();
    }

    if (props.user) {
        return (<div className="app">
                <header>
                    <h1 className="titleApp">Todo list</h1>
                    <Button variant="dark" className="logOut"
                            onClick={() => {
                                logOut()
                            }}>Log out</Button>
                </header>
                <main className="todoList">
                    <InputText symbol={props.user._id} spinnerChange={props.spinnerChange} createNewTask={props.createNewTaskLocal}/>
                    {props.tasks.length !== 0 ? (
                        <div>
                            <ContainerTodoList/>
                            <ContainerFooter/>
                        </div>
                    ) : null}
                </main>
            </div>
        );
    }
    // return <Spinner className='preloader' animation="grow"/>
    return null

}

export default App;
