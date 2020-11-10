import React from "react";
import Button from "react-bootstrap/cjs/Button";
import {changeType} from "../../store/reducers/todo/actions/actions";
import {deleteTasksCompleted} from "../../store/reducers/todo/actions/thunks";
import {connect} from "react-redux";

function Buttons({ changeType, tasks, deleteTasksCompleted }) {
  const button = ["all", "todo", "completed"];
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
        <Button variant="dark" onClick={() => deleteTasksCompleted() }>
          Completed tasks
        </Button>
      ) : null}
    </>
  );
}

let mapStateToProps =(state) => {
  return {
    tasks:state.todo.tasks
  }
}

export default connect(mapStateToProps, { changeType, deleteTasksCompleted })(Buttons) ;
