import React from "react";
import { connect } from "react-redux";
import { deleteTasksCompleted, changeType } from "../Redux/todo_Reducer";

import Footer from "./Footer";

class FooterContainer extends React.Component {
  render() {
    let deleteTasks = () => {
      this.props.deleteTasksCompleted();
      let tasker = JSON.parse(localStorage.getItem("ReactTasks"));
      localStorage.setItem(
        "ReactTasks",
        JSON.stringify(tasker.filter((elem) => elem.taskChecked === false))
      );
    };
    return <Footer {...this.props} deleteTasks={deleteTasks} />;
  }
}

let mapStateToProps = (state) => {
  return {
    tasks: state.todo.tasks,
  };
};
export default connect(mapStateToProps, {
  deleteTasksCompleted,
  changeType,
})(FooterContainer);
