import React from "react";
import {connect} from "react-redux";
import {createNewTaskLocal, getTasksLocal, createUser, getUser, refreshTokens} from "../store/reducers/todo/actions/thunks.js";
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
import {Spinner} from "react-bootstrap";


class ContainerApp extends React.Component {
    async componentDidMount() {
        let auth = await localStorage.getItem('user')
        if (auth && auth.includes('Bearer') === false) {
            localStorage.removeItem("user")
        }
        if (!this.props.user && auth) {
            await this.props.getUser(undefined, undefined, auth)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.user && this.props.user && prevProps.user !== this.props.user.name) {
            this.props.getTasksLocal(this.props.user._id ? this.props.user._id : null);
        }
    }

    render() {
        if (!this.props.auth) return <Spinner className='preloader' animation="grow"/>

        return (<div className={"app"}>
            <ButtonsAuth location={this.props.location} history={this.props.history} auth={this.props.auth}/>
            <Route path={"/login"} render={() => AuthHoc(ContainerLogin, this.props)}/>
            <Route path={"/registration"} render={() => AuthHoc(ContainerRegistration, this.props)}/>
            <Route path={"/tasks"} render={() => AppHoc(App, this.props)}/>
        </div>)
    }
}

let mapStateToProps = (state) => ({tasks: state.todo.tasks, user: state.todo.user, auth: state.todo.auth});
let ContainerAppCompose = compose(
    withRouter,
    connect(mapStateToProps, {createNewTaskLocal, getTasksLocal, createUser, getUser, refreshTokens})
)(ContainerApp)
export default ContainerAppCompose
