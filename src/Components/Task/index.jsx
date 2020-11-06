import {Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import React from "react";

let Task = (props) => {
    return (
        <Container>
            <Row className="inputCheck">

                <Col>
                    <label>
                        {props.taskChecked ? (
                            <input
                                defaultChecked={true}
                                onClick={(e) => {
                                    props.checkedLocal(e.target.checked, props.idTask);
                                }}
                                type="checkBox"
                            />
                        ) : (
                            <input
                                onClick={(e) => {
                                    props.checkedLocal(e.target.checked, props.idTask);
                                }}
                                type="checkBox"
                            />
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
                            props.deleteTask(props.idTask);
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