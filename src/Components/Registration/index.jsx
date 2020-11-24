import "../../App.css";
import React, {useCallback, useState} from "react";
import Form from "react-bootstrap/Form";
import {Button, Row} from "react-bootstrap";

function Registration(props) {
    let [name, upName] = useState()
    let [password, upPassword] = useState()
    let [statusUser, upStatusUser] = useState()
    let [disable, upDisable] = useState(false)

    let registers = useCallback(async () => {
        upDisable(true)
        if (!props.user && name && password !== undefined) {
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
            <h1>Registration</h1>
            <Form.Group as={Row} controlId="formHorizontalName">
                <h4> Name</h4>
                <Form.Control type="text" onChange={(e) => upName(e.target.value)} placeholder="Name"/>
                {statusUser ? <h3 className="status">{statusUser}</h3> : null}
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
                <h4> Password</h4>
                <Form.Control type="password" onChange={(e) => upPassword(e.target.value)} placeholder="Password"/>
            </Form.Group>
            <Button variant="dark"
                    disabled={disable}
                    onClick={registers}
            >Create User</Button>
        </div>
    );
}

export default Registration;
