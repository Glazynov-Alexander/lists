import React from "react";
import {connect} from "react-redux";
import Footer from "../Components/Footer";

import {changeType} from "../store/reducers/todo/actions/actions";
import {deleteTasksCompleted} from "../store/reducers/todo/actions/thunks.js";

class ContainerFooter extends React.Component {
    render() {
        let deleteTasks = () => {
            return this.props.deleteTasksCompleted(this.props.user._id);
        };
        return <Footer {...this.props} deleteTasks={deleteTasks}/>;
    }
}

let mapStateToProps = (state) => ({tasks: state.todo.tasks, user: state.todo.user});
export default connect(mapStateToProps, {deleteTasksCompleted, changeType})(ContainerFooter);
