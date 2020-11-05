import React from "react";
import { connect } from "react-redux";
import "../Components/Todos/TodoList.css";
import { deleteTask, checkedLocal } from "../thunks/thunks.js";
import TodoList from "../Components/Todos/TodoList.jsx";

class ContainerTodoList extends React.Component {
  render() {
    return <TodoList {...this.props} />;
  }
}

let mapStateToProps = (state) => ({tasks: state.todo.tasks, typeList: state.todo.typeList});
export default connect(mapStateToProps, { checkedLocal, deleteTask })(ContainerTodoList);
