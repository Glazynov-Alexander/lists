import {Col, Container, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";

let Task = (props) => {
    let [spinner, funClick] = useState(false)
    if (spinner) {
        return <Spinner className="loader" animation="border" variant="dark"/>
    }
    return (
        <Container>
            <Row className="inputCheck">

                <Col>
                    <label>
                        {props.taskChecked ? (<input
                                defaultChecked={true}
                                onClick={(e) => {
                                    funClick(true)
                                    props.checkedLocal(e.target.checked, props._id, props.symbol).then(response => {
                                        funClick(false)
                                    })
                                }} type="checkBox"/>
                        ) : (<input
                                onClick={(e) => {
                                    funClick(true)
                                    props.checkedLocal(e.target.checked, props._id, props.symbol).then(response => {
                                        funClick(false)
                                    });
                                }} type="checkBox"/>
                        )}
                        <span className={"pseudoBox"}></span>
                    </label>
                </Col>

                <Col className="text">
                    {props.taskChecked ? (
                        <div className="bodyTaskTrue">
                            <p>{props.textTask}</p>
                        </div>
                    ) : (
                        <div className="bodyTaskFalse">
                            <p>{props.textTask}</p>
                        </div>
                    )}
                </Col>

                <Col>
                    <FontAwesomeIcon
                        onClick={() => {
                            funClick(true)
                            props.deleteTask(props._id, props.symbol).then(response => {
                                funClick(false)
                            });
                        }}
                        className={"trashIcon"}
                        icon={faTrashAlt}
                    />
                </Col>

            </Row>
        </Container>
    )
}

export default Task