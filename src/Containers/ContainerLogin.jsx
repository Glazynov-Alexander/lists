import React from "react";
import {connect} from "react-redux";

import { getUser } from "../store/reducers/todo/actions/thunks.js";
import Login from "../Components/Login";

class ContainerLogin extends React.Component {
    render() {
          return <Login {...this.props}/>
    }
}

let mapStateToProps = (state) => ({user: state.todo.user ,auth: state.todo.auth});


export default connect(mapStateToProps, {getUser})(ContainerLogin);
