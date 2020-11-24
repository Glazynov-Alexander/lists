import {Button} from "react-bootstrap";
import React from "react";

function ButtonsAuth(props) {
    if (props.location.pathname !== "/tasks") {
        //если в урле /tasks эти кнопки не отображаются
        return <div className={"loginButtons"}>
            <Button variant="dark" disabled={!props.auth} onClick={() => props.history.push('/tasks')}>enter</Button>
            <Button variant="dark" disabled={props.auth} onClick={() => props.history.push('/registration')}>Registration</Button>
            <Button variant="dark" disabled={props.auth} onClick={() => props.history.push('/login')}>Login</Button>
        </div>
    }
    return null
}

export default ButtonsAuth