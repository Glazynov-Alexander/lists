import React from "react";
import { connect } from "react-redux";

import App from "./App";
import {
  createNewTaskLocal,
  getTasksLocal,
} from "./components/Redux/todo_Reducer";

class AppContainer extends React.Component {
  componentDidMount() {
    this.props.getTasksLocal(this.props.tasks);
  }

  render() {
    let createNewTask = (e) => {
      if (e.code === "Enter" && e.target.value !== "") {
        this.props.createNewTaskLocal(e.target.value);
        e.target.value = "";
      }
    };
    return <App createNewTask={createNewTask} tasks={this.props.tasks} />;
  }
}

let mapStateToProps = (state) => {
  return {
    tasks: state.todo.tasks,
  };
};
export default connect(mapStateToProps, {
  createNewTaskLocal,
  getTasksLocal,
})(AppContainer);
