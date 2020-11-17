import "../../App.css";
import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import {Button, Col, Row} from "react-bootstrap";


function Registration(props) {
    let [name, upName] = useState()
    let [password, upPassword] = useState()
    let [statusUser, upStatusUser] = useState()
    let [disable, upDisable] = useState(false)


    let  sd = async () => {
        upDisable(true)
        if (!props.user && name !== undefined && password !== undefined) {
            let response = await props.createUser(name, password)
            upStatusUser(response)

            upDisable(false)
        }


    }


    return (
        <div className="inputText">
            <h1>Registration</h1>
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
            <Button variant="dark" disabled={disable} onClick={(e) => {
                sd()
            }}
            >Create User</Button>
        </div>
    );
}

export default Registration;
