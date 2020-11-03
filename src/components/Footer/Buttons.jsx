import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/cjs/Button";

function Buttons({ changeType, tasks, deleteTasksCompleted }) {
  let button = ["all", "todo", "completed"];
  return (
    <>
      {button.map((elem, inde) => {
        return (
          <Button
            key={inde}
            variant="outline-secondary"
            onClick={() => changeType(elem)}
          >
            {elem}
          </Button>
        );
      })}

      {tasks.some((elem) => elem.taskChecked === true) ? (
        <Button variant="dark" onClick={() => deleteTasksCompleted()}>
          Completed tasks
        </Button>
      ) : null}
    </>
  );
}

export default Buttons;
