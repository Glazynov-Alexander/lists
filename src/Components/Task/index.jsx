import {Col, Container, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import React, {useCallback, useState} from "react";

let Task = (props) => {
    let [spinner, spinnerChange] = useState(false)
    let preloader = useCallback((e) => {
        spinnerChange(true)
        if (e.target.tagName === "INPUT") {
             props.checkedLocal(e.target.checked, props._id, props.symbol)
        } else {
            props.deleteTask(props._id, props.symbol)
        }

    }, [props])

    if (spinner) return <Spinner className="loaderInputText" animation="border" variant="dark"/>
    return (
        <Container>
            <Row className="inputCheck">
                <Col>
                    <label>
                        {props.taskChecked ? (
                            <input defaultChecked={true}
                                   onClick={preloader}
                                   type="checkBox"/>
                        ) : (<input onClick={preloader} type="checkBox"/>)}
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
                        onClick={preloader}
                        className="trashIcon"
                        icon={faTrashAlt}/>
                </Col>
            </Row>
        </Container>
    )
}
export default Task