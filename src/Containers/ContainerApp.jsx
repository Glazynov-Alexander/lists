import React from "react";
import {connect} from "react-redux";
import {createNewTaskLocal, getTasksLocal, createUser, getUser, refreshTokens, logOutUse, loginAuto, loginVK} from "../store/reducers/todo/actions/thunks.js";
import {authUser} from "../store/reducers/todo/actions/actions.js";
import {withRouter} from "react-router";
import '../App.css'
import {compose} from "redux";
import {AppHoc} from "../Hocs/AppHoc";
import App from "../App";
import {AuthHoc} from "../Hocs/AuthHoc";
import ContainerLogin from "./ContainerLogin";
import ContainerRegistration from "./ContainerRegistration";
import {Route} from "react-router-dom";
import ButtonsAuth from "../Components/Buttons/ButtonsAuth";

class ContainerApp extends React.Component {
    async componentDidMount() {
        if (!this.props.auth) {
            await this.props.loginVK(this.props.location.pathname)
        }
        if (!this.props.user && !this.props.auth && this.props.auth !== false) {
            await this.props.loginAuto()
        }
    }


    render() {


        return (<div className={"app"}>
            <ButtonsAuth location={this.props.location} history={this.props.history} auth={this.props.auth}/>
            <Route path="/login" render={() => AuthHoc(ContainerLogin, this.props)}/>
            <Route path="/registration" render={() => AuthHoc(ContainerRegistration, this.props)}/>
            <Route path="/tasks" render={() => AppHoc(App, this.props)}/>
        </div>)
    }
}

let mapStateToProps = (state) => ({tasks: state.todo.tasks, user: state.todo.user, auth: state.todo.auth});
let ContainerAppCompose = compose(
    connect(mapStateToProps, {createNewTaskLocal, getTasksLocal, createUser, getUser, refreshTokens, authUser, logOutUse, loginAuto, loginVK}),
    withRouter
)(ContainerApp)
export default ContainerAppCompose
