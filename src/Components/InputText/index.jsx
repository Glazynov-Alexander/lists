import "../../App.css";
import React, {useCallback, useState} from "react";
import Form from "react-bootstrap/Form";
import {Alert, Spinner} from "react-bootstrap";

function InputText({createNewTask, symbol}) {
    let [spinner, spinnerChange] = useState(false)
    let [error, changeError] = useState("")

    let preloader = useCallback(async (e) => {
        spinnerChange(true)
        if (e.target.tagName === "INPUT"
            && error.length <= 20
            && error.length >= 3
            && e.code === 'Enter') {
            if (symbol) {
                createNewTask(e.target.value, symbol)
            }
        } else {
            spinnerChange(false)
        }
    }, [error.length, symbol, createNewTask])

    if (spinner) return <Spinner className="loaderInputText" animation="border" variant="dark"/>

    return (
        <div className="inputText">
            <Form.Control
                className={"rounded-0 inputTodo border-top-0 border-right-0 border-left-0"}
                onKeyDown={preloader}
                placeholder="enter your task"
                onChange={e => changeError(e.target.value)}
            />
            {error.length > 20 || (error.length < 3 && error.length > 0) ? <Alert variant={"danger"}>{error.length > 20
                ? "error max length 20"
                : error.length < 3 && error.length > 0 ? "error min length 3" : null}</Alert> : null}
        </div>
    );
}

export default InputText;
