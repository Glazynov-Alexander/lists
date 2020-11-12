import React from "react";
import {connect} from "react-redux";

import {createUser} from "../store/reducers/todo/actions/thunks.js";
import Registration from "../Components/Registration";
import {withRouter} from "react-router";

class ContainerLogin extends React.Component {
    render() {
        return <Registration {...this.props}/>
    }
}

let mapStateToProps = (state) => ({user: state.todo.user});


export default withRouter(connect(mapStateToProps, {createUser})(ContainerLogin));
