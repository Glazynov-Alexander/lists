import React from "react";
import {connect} from "react-redux";

import App from "../App";
import {createNewTaskLocal, getTasksLocal} from "../thunks/thunks.js";

class ContainerApp extends React.Component {
    componentDidMount() {
        this.props.getTasksLocal(this.props.tasks);
    }

    render() {
        let createNewTask = (elem) => {
            if (elem.code === "Enter" && elem.target.value !== "") {
                this.props.createNewTaskLocal(elem.target.value);
                elem.target.value = "";
            }
        };
        return <App createNewTask={createNewTask} tasks={this.props.tasks}/>;
    }
}

let mapStateToProps = (state) => ({tasks: state.todo.tasks});
export default connect(mapStateToProps, {createNewTaskLocal, getTasksLocal})(ContainerApp);
