import "../../App.css";
import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import {Spinner} from "react-bootstrap";

function InputText(props) {
    let [spinner, funClick]  =useState(false)
    if(spinner) {
        return   <Spinner className="loaderInputText" animation="border" variant="dark" />
    }
    return (
        <div className="inputText" >
            <Form.Control

                className={"rounded-0 inputTodo border-top-0 border-right-0 border-left-0"}
                onKeyDown={(e) => {if(e.code === 'Enter') {
                    funClick(true)
                    props.createNewTask(e, props.symbol).then(response => {
                        funClick(false)
                })}  }}

                placeholder="enter your task"
            />
        </div>
    );
}

export default InputText;
