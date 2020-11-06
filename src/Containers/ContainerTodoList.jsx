import React from "react";
import { connect } from "react-redux";
import "../Components/TodoList/style.css";
import { deleteTask, checkedLocal } from "../store/reducers/todo/actions/thunks.js";
import Index from "../Components/TodoList";

class ContainerTodoList extends React.Component {
  render() {
    return <Index {...this.props} />;
  }
}

let mapStateToProps = (state) => ({tasks: state.todo.tasks, typeList: state.todo.typeList});
export default connect(mapStateToProps, { checkedLocal, deleteTask })(ContainerTodoList);
