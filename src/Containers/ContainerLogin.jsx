import React from "react";
import {connect} from "react-redux";

import {createUser} from "../store/reducers/todo/actions/thunks.js";
import Login from "../Components/Login";

class ContainerLogin extends React.Component {
    render() {

          return (<div className="app">
              <Login getUser={this.props.getUser} createUser={this.props.createUser}/>
          </div>)

    }
}

let mapStateToProps = (state) => ({user: state.todo.user});


export default connect(mapStateToProps, {createUser})(ContainerLogin);
