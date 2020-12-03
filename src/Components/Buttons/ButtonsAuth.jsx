import {Button, NavLink} from "react-bootstrap";
import React from "react";
import logo from "../../icons/vk-logo.svg";



function ButtonsAuth(props) {

    if (props.location.pathname !== "/tasks") {
        //если в урле /tasks эти кнопки не отображаются

        return <div className={"buttonAuth"}>
            {props.location.pathname === "/login" ? <h1 className="titleAuth">Log in</h1> : null}
            {props.location.pathname === "/registration" ? <h1 className="titleAuth">Registration</h1> : null}
            {props.auth ? <div className="buttonEnter"><NavLink href="/tasks"><Button variant="dark"  disabled={!props.auth}>enter</Button></NavLink></div>
                : <div className="loginButtons">
                    <NavLink href="http://localhost:5001/auth/vkontakte" ><img  src={logo} alt=""/></NavLink>
                    <NavLink href="/registration"><Button variant="dark" disabled={props.auth}>Registration</Button></NavLink>
                    <NavLink href="/login"><Button variant="dark" disabled={props.auth}>Login</Button></NavLink>
                </div>
            }
        </div>
    }
    return null
}

export default ButtonsAuth