import "../../App.css";
import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import {Button, Col, Row} from "react-bootstrap";

function Login(props) {
    let [name, upName] = useState()
    let [password, upPassword] = useState()

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
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                        Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" onChange={(e) => upPassword(e.target.value)}  placeholder="Password"/>
                    </Col>
                </Form.Group>
            </Form>
            <Button variant="dark" onClick={() => {
                if(password && name) {props.createUser(name, password)}}}
                >Login</Button>
        </div>
    );
}

export default Login;
