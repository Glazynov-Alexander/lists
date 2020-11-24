import {Button, NavLink} from "react-bootstrap";
import React from "react";

function ButtonsAuth(props) {
    if (props.location.pathname !== "/tasks") {
        //если в урле /tasks эти кнопки не отображаются
        return <div className={"loginButtons"}>
            <NavLink href="/tasks"><Button variant="dark" disabled={!props.auth} >enter</Button></NavLink>
            <NavLink href="/registration"><Button variant="dark" disabled={props.auth} >Registration</Button></NavLink>
            <NavLink href="/login"><Button variant="dark" disabled={props.auth} >Login</Button></NavLink>
        </div>
    }
    return null
}
export default ButtonsAuth