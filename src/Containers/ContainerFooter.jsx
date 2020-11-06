import React from "react";
import {connect} from "react-redux";
import Index from "../Components/Footer";

import {changeType} from "../store/reducers/todo/actions/actions";
import {deleteTasksCompleted} from "../store/reducers/todo/actions/thunks.js";

class ContainerFooter extends React.Component {
    render() {
        let deleteTasks = () => {
            this.props.deleteTasksCompleted();
            let tasks = JSON.parse(localStorage.getItem("ReactTasks"));
            localStorage.setItem("ReactTasks", JSON.stringify(tasks.filter((elem) => elem.taskChecked === false)));
        };
        return <Index {...this.props} deleteTasks={deleteTasks}/>;
    }
}

let mapStateToProps = (state) => ({tasks: state.todo.tasks});
export default connect(mapStateToProps, {deleteTasksCompleted, changeType})(ContainerFooter);
