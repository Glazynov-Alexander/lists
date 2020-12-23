import "../../App.css";
import React, {useCallback, useState} from "react";
import Form from "react-bootstrap/Form";
import {Button, Row, Alert} from "react-bootstrap";

function Login(props) {
    let [name, upName] = useState("")
    let [password, upPassword] = useState("")
    let [statusUser, upStatusUser] = useState("")
    let [disable, upDisable] = useState(false)
    function changeField(e) {
        upName(e.target.value)
        upStatusUser("")
    }
    function changeFieldPassword(e) {
        upPassword(e.target.value)
        upStatusUser("")
    }
    let res
    let logins = useCallback(async () => {
        upDisable(true)
        if (!props.user && name && password !== undefined) {
            res = await props.getUser(name, password, props.auth)
            if (res) {
               await upStatusUser(res)
                await upDisable(false)
            }
        } else {

                await upStatusUser(res)
                await upDisable(false)

            upDisable(false)
        }
    }, [props, name, password])
    return (<div className="inputText">


            <Form.Group as={Row}  controlId="formHorizontalName">
                <h4> Name</h4>
                <Form.Control type="text" onChange={changeField} placeholder="Name"/>

            </Form.Group>

            <Form.Group as={Row}  controlId="formHorizontalPassword">
                <h4> Password</h4>
                <Form.Control type="password"  onChange={changeFieldPassword} placeholder="Password"/>

            </Form.Group>
            {statusUser ? <div className="status"><h3 >{statusUser}</h3></div> : null}
            {statusUser ? <Alert variant="danger">{statusUser}</Alert>: null}

        </div>
    );
}

export default Login;