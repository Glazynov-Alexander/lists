import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Buttons from "./Buttons";

function Footer({ tasks, deleteTasksCompleted, changeType }) {
  let notFinishTasks = tasks.filter((elem) => elem.taskChecked === false);
  return (
    <div className={"footer"}>
      <div>
        <p className={"checkTodo"}>
          {notFinishTasks.length === 0
            ? "not tasks"
            : notFinishTasks.length + " not completed tasks"}
        </p>
      </div>
      <div className={"boottonFooter"}>
        <Buttons
          changeType={changeType}
          deleteTasksCompleted={deleteTasksCompleted}
          tasks={tasks}
        />
      </div>
    </div>
  );
}

export default Footer;
