import React, {useMemo} from "react";
import "./style.css";

import {ListGroupItem} from "react-bootstrap";
import Task from "../Task";

function TodoList(props) {
    // let tasks = [];


    let tasks = useMemo(() => {
        switch (props.typeList) {
            case "all": {
                 return props.tasks;
            }
            case "completed": {
                return  props.tasks.filter((elem) => elem.taskChecked === true);
            }
            case "todo": {
                return props.tasks.filter((elem) => elem.taskChecked === false);
            }
            default : {
                return  props.tasks
            }
        }
    }, [props])

    return (
        <ListGroupItem className="scroll">

            {tasks.map((el) => {
                if (!el) return null;
                else if (props.user._id === el.symbol) {
                    return <div key={el._id} className="todo">
                        <Task  {...el} checkedLocal={props.checkedLocal} deleteTask={props.deleteTask}/>
                    </div>
                }
                return null
            })}
        </ListGroupItem>
    );
}

export default TodoList;
