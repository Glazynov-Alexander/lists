import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Buttons from "../Buttons/ButtonsFooter";

function Footer({tasks, deleteTasks, tasksCheckeds}) {
    let notFinishTasks = tasks.filter((elem) => elem.taskChecked === false);
    let [state, changeState] = useState(true)
    if (notFinishTasks.length === 0 && state === true) {
        changeState(false)
    }
    return (
        <div className="footer">
            <p onClick={() => tasksCheckeds(state)}>
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
