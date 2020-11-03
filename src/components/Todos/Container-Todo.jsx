import React from "react";
import { connect } from "react-redux";
import "./Todo.css";
import Todo from "./Todo.jsx";

import { deleteTask, checkedLocal } from "../Redux/todo_Reducer";

class TodoContainer extends React.Component {
  render() {
    return <Todo {...this.props} />;
  }
}

let mapStateToProps = (state) => {
  return {
    tasks: state.todo.tasks,
    typeList: state.todo.typeList,
  };
};
export default connect(mapStateToProps, {
  checkedLocal,
  deleteTask,
})(TodoContainer);
