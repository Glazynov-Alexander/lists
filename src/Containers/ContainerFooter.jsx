import React from "react";
import {connect} from "react-redux";
import Footer from "../Components/Footer/Footer";

import {changeType} from "../actions/actions";
import {deleteTasksCompleted} from "../actions/thunks.js";

class ContainerFooter extends React.Component {
    render() {
        let deleteTasks = () => {
            this.props.deleteTasksCompleted();
            let tasks = JSON.parse(localStorage.getItem("ReactTasks"));
            localStorage.setItem("ReactTasks", JSON.stringify(tasks.filter((elem) => elem.taskChecked === false)));
        };
        return <Footer {...this.props} deleteTasks={deleteTasks}/>;
    }
}

let mapStateToProps = (state) => ({tasks: state.todo.tasks});
export default connect(mapStateToProps, {deleteTasksCompleted, changeType})(ContainerFooter);
