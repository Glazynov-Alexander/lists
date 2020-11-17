import React, {useMemo} from "react";
import "./style.css";

import {Modal} from "react-bootstrap";
import Task from "../Task";

function TodoList(props) {
    let tasks = [];
    if (props.typeList === "completed") {
        tasks = props.tasks.filter((elem) => elem.taskChecked === true);
    } else if (props.typeList === "todo") {
        tasks = props.tasks.filter((elem) => elem.taskChecked === false);
    } else if (props.typeList === "all") {
        tasks = props.tasks;
    }
    // let a = () => {
    //     return tasks.map((el) => {
    //         if (!el) return null;
    //         else if (props.user._id === el.symbol) {
    //             return <div key={el._id} className="todo">
    //                 <Task  {...el} checkedLocal={props.checkedLocal} deleteTask={props.deleteTask}/>
    //             </div>
    //         }
    //         return null
    //     })
    // }
    //
    // let taskers = useMemo(() => {
    //     return a()
    // }, [])

    return (
        <Modal.Body className="scroll">
            {tasks.map((el) => {
                if (!el) return null;
                else if (props.user._id === el.symbol) {
                    return <div key={el._id} className="todo">
                        <Task  {...el} checkedLocal={props.checkedLocal} deleteTask={props.deleteTask}/>
                    </div>
                }
                return null
            })}
        </Modal.Body>
    );
}

export default TodoList;
