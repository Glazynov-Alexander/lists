import React from "react";
import {connect} from "react-redux";

import {createUser, getUser} from "../store/reducers/todo/actions/thunks.js";
import Login from "../Components/Login";

class ContainerLogin extends React.Component {
    render() {
          return <Login {...this.props}/>
    }
}

let mapStateToProps = (state) => ({user: state.todo.user});


export default connect(mapStateToProps, {createUser, getUser})(ContainerLogin);
