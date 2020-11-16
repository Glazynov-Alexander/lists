import "../../App.css";
import React, { useState} from "react";
import Form from "react-bootstrap/Form";
import {Spinner} from "react-bootstrap";

function InputText({createNewTask, symbol}) {

    let [spinner, spinnerChange]  =useState(false)
    if(spinner) {
        return   <Spinner className="loaderInputText" animation="border" variant="dark" />
    }
    const preloader = (e) => {
        spinnerChange(true)
        createNewTask(e, symbol).then(response => {
            spinnerChange(false)
        })
    }
    return (
        <div className="inputText" >

            <Form.Control
                className={"rounded-0 inputTodo border-top-0 border-right-0 border-left-0"}
                onKeyDown={(e) => {if(e.code === 'Enter')   preloader(e) } }
                placeholder="enter your task"
            />
        </div>
    );
}

export default InputText;
