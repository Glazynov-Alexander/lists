import "../../App.css";
import React, {useCallback, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import {Spinner} from "react-bootstrap";

function InputText({createNewTask, symbol}) {
    let [spinner, spinnerChange] = useState(false)
    let [error, searchError] = useState("")
    let [text, changeText] = useState("")

    let preloader = useCallback((e) => {
        spinnerChange(true)
        if (e.target.tagName === "INPUT" && text.length < 20) {
            if (symbol) createNewTask(e.target.value, symbol)
        } else {
            spinnerChange(false)
        }

    }, [text, symbol, createNewTask])

    useEffect(() => {
        text.length < 20 ? searchError("") : searchError("error max length 20")
    }, [text])
    if (spinner) return <Spinner className="loaderInputText" animation="border" variant="dark"/>

    return (
        <div className="inputText">
            <Form.Control
                className={"rounded-0 inputTodo border-top-0 border-right-0 border-left-0"}
                onKeyDown={(e) => {
                    if (e.code === 'Enter') preloader(e)
                }}
                placeholder="enter your task"
                value={text}
                onChange={e => changeText(e.target.value)}
            />
            {error ? <h1 className="status">{error}</h1> : null}
        </div>
    );
}

export default InputText;
