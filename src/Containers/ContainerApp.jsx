import React from "react";
import {connect} from "react-redux";

import App from "../App";
import {createNewTaskLocal, getTasksLocal} from "../store/reducers/todo/actions/thunks.js";
import Axios from "axios";
// let user = '5fa8e0d7ff601f2798955c50'
class ContainerApp extends React.Component {
    componentDidMount() {
        // Axios.get("/products/bit/drozd").then(response => {
        //      console.log(response.data)
        // })

        // Axios.post("/products/set", {email: "body@fog", name: "dambldor"})

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
