import React from "react";
import "./TodoList.css";

import {Modal} from "react-bootstrap";
import Task from "../Task/Task";

function TodoList(props) {
    let tasks = [];

    if (props.typeList === "completed") {
        tasks = props.tasks.filter((elem) => elem.taskChecked === true);
    } else if (props.typeList === "todo") {
        tasks = props.tasks.filter((elem) => elem.taskChecked === false);
    } else if (props.typeList === "all") {
        tasks = props.tasks;
    }

    return (
        <Modal.Body className="scroll">
            {tasks.map((el) => {
                if (!el) {
                    return null;
                }
                return (
                    <div key={el.idTask} className="todo">
                        <Task  {...el} checkedLocal={props.checkedLocal} deleteTask={props.deleteTask}/>
                    </div>
                );
            })}
        </Modal.Body>
    );
}

export default TodoList;
