import "../../App.css";
import React from "react";
import Form from "react-bootstrap/Form";

function InputText(props) {
    return (
        <div className="inputText" >
            <Form.Control
                className={
                    "rounded-0 inputTodo border-top-0 border-right-0 border-left-0"
                }
                onKeyDown={(e) => {
                    props.createNewTask(e);
                }}
                placeholder="enter your task"
            />
        </div>
    );
}

export default InputText;
