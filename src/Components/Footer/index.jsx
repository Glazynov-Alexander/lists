import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Buttons from "../Buttons/ButtonsFooter";

function Footer({tasks, deleteTasks, tasksCheckeds}) {
    let notFinishTasks = tasks.filter((elem) => elem.taskChecked === false);
    return (
        <div className="footer">
            <p onClick={() => tasksCheckeds(true)}>
                {notFinishTasks.length === 0
                    ? "not tasks"
                    : notFinishTasks.length + " not completed tasks"}
            </p>
            <div className="buttonFooter">
                <Buttons deleteTasks={deleteTasks}/>
            </div>
        </div>
    );
}

export default Footer;
