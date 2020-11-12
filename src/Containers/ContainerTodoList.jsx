import React from "react";
import {connect} from "react-redux";
import "../Components/TodoList/style.css";
import {deleteTask, checkedLocal} from "../store/reducers/todo/actions/thunks.js";
import TodoList from "../Components/TodoList";

class ContainerTodoList extends React.Component {
    render() {
        return <TodoList {...this.props} />;
    }
}

let mapStateToProps = (state) => ({tasks: state.todo.tasks, typeList: state.todo.typeList, user: state.todo.user});
export default connect(mapStateToProps, {checkedLocal, deleteTask})(ContainerTodoList);
