import React, {useState} from "react";
import Button from "react-bootstrap/cjs/Button";
import {changeType} from "../../store/reducers/todo/actions/actions";
import {connect} from "react-redux";
import {Spinner} from "react-bootstrap";

function Buttons({changeType, tasks, deleteTasks}) {
    const button = ["all", "todo", "completed"];
    let [spinner, funClick] = useState(false)
    if (spinner) {
        return <Spinner className="loader" animation="border" variant="dark"/>
    }
    return (
        <>
            {button.map((elem, index) => {

                return (
                    <Button
                        key={index}
                        variant="outline-secondary"
                        onClick={() => changeType(elem)}
                    >
                        {elem}
                    </Button>
                );
            })}

            {tasks.some((elem) => elem.taskChecked === true) ? (
                <Button variant="dark" onClick={() => {
                    funClick(true)
                    deleteTasks().then(response => {
                        funClick(false)
                    })
                }}>
                    Completed tasks
                </Button>
            ) : null}
        </>
    );
}

let mapStateToProps = (state) => ({tasks: state.todo.tasks})
export default connect(mapStateToProps, {changeType})(Buttons);
