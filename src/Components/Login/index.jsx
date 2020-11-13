import "../../App.css";
import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {Button, Col, Row} from "react-bootstrap";

function Login(props) {
    let [name, upName] = useState()
    let [password, upPassword] = useState()
    let [statusUser, upStatusUser] = useState()
    let [disable, upDisable] = useState(false)
    useEffect(() => {
        if (name && password) {
            props.getUser(name, password).then(response => {
                if (response) {
                    upStatusUser(response)
                    upDisable(false)
                }
            })
        }
    }, [disable])

    return (
        <div className="inputText">
            <h1>Log in</h1>
            <Form>
                <Form.Group as={Row} controlId="formHorizontalName">
                    <Form.Label column sm={2}>
                        Name
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" onChange={(e) => upName(e.target.value)} placeholder="Name"/>
                        {statusUser ? <h3 className="status">{statusUser}</h3> : null}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" onChange={(e) => upPassword(e.target.value)} placeholder="Password"/>
                    </Col>
                </Form.Group>
            </Form>
            <Button variant="dark" disabled={disable} onClick={() => {
                upDisable(true)
            }}
            >Login</Button>
        </div>
    );
}

export default Login;