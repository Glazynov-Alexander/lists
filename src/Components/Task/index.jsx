import {Col, Container, Row, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";

let Task = (props) => {
    let [spinner, spinnerChange] = useState(false)

    const preloader = (e, type) => {
        spinnerChange(true)
        if (type) {
            props.checkedLocal(e.target.checked, props._id, props.symbol).then(response => {
                spinnerChange(false)
            })
        } else if (!type) {
            props.deleteTask(props._id, props.symbol)
        } else {
            spinnerChange(false)
        }
    }
    if (spinner) return <Spinner className="loaderInputText" animation="border" variant="dark"/>
    return (
        <Container>
            <Row className="inputCheck">

                <Col>
                    <label>
                        {props.taskChecked ? (<input defaultChecked={true}
                                                     onClick={(e) => {
                                                         preloader(e, true)
                                                     }}
                                                     type="checkBox"/>
                        ) : (<input onClick={(e) => {
                            preloader(e, true)
                        }}
                                    type="checkBox"/>)
                        }
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
                            preloader(null, false)
                        }}
                        className="trashIcon"
                        icon={faTrashAlt}/>
                </Col>

            </Row>
        </Container>
    )
}
export default Task