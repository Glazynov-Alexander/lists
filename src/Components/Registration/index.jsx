import "../../App.css";
import React, {useCallback, useState} from "react";
import Form from "react-bootstrap/Form";
import {Alert, Button, Row} from "react-bootstrap";

function Registration(props) {
    let [name, upName] = useState("")
    let [password, upPassword] = useState("")
    let [statusUser, upStatusUser] = useState("")
    let [disable, upDisable] = useState(false)

    function changeFieldName(e) {

        upName(e.target.value)
        upStatusUser("")
    }

    function changeFieldPassword(e) {
        upPassword(e.target.value)
        upStatusUser("")
    }

    let registers = useCallback(async () => {
        upDisable(true)
        if (!props.user && name && password) {
            let response = await props.createUser(name, password)
            if (response) {
                upStatusUser(response)
                upDisable(false)
            }
        } else {
            upDisable(false)
        }
    }, [props, name, password])

    return (
        <div className="inputText">
            <Form.Group as={Row} controlId="formHorizontalName">
                <h4> Name</h4>
                <Form.Control type="text" onChange={changeFieldName} placeholder="Name"/>

            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
                <h4> Password</h4>
                <Form.Control type="password" onChange={changeFieldPassword} placeholder="Password"/>
            </Form.Group>

            {statusUser ? <Alert variant={"danger"}>{statusUser}</Alert> : null}
            <Button variant="dark" disabled={disable} onClick={registers}>Create User</Button>
        </div>
    );
}

export default Registration;
