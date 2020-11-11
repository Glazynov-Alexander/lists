import React, {Suspense, useEffect} from "react";
import {connect} from "react-redux";
import {createNewTaskLocal, getTasksLocal, createUser, getUser} from "../store/reducers/todo/actions/thunks.js";
import {Redirect, Route, withRouter} from "react-router";
import {Spinner} from "react-bootstrap";
import '../App.css'
import {compose} from "redux";

const ContainerLogin = React.lazy(() => import("./ContainerLogin"))
const App = React.lazy(() => import("../App"))


class ContainerApp extends React.Component {
    async componentDidMount() {
        let auth = await JSON.parse(localStorage.getItem('user'))
        if (!this.props.user && auth) {
            await this.props.createUser(auth.name, auth.password)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user === null && this.props.user !== null && prevProps.user !== this.props.user.name) {
            this.props.getUser(this.props.user.name)
            this.props.getTasksLocal(this.props.user._id ? this.props.user._id : null);
        }
    }

    render() {
        let createNewTask = (elem, symbol) => {
            if (elem.code === "Enter" && elem.target.value !== "") {
                this.props.createNewTaskLocal(elem.target.value, symbol);
                elem.target.value = "";
            }
        };

        if (!this.props.user) {
            return <div className="app">
                <Suspense fallback={<Spinner className='preloader' animation="grow"/>}>
                    <Redirect to="/Login"/>
                    <Route path="/Login" render={() => <ContainerLogin/>}/>
                </Suspense>
            </div>
        }

        return <div className="app">
            <Suspense fallback={<Spinner className="preloader" animation="grow"/>}>
                <Redirect to="/Tasks"/>
                <App symbol={this.props.user._id} history={this.props.history} createNewTask={createNewTask} tasks={this.props.tasks}/>
            </Suspense>
        </div>

    }
}

let mapStateToProps = (state) => ({tasks: state.todo.tasks, user: state.todo.user});
let ContainerAppCompose = compose(
    withRouter,
    connect(mapStateToProps, {createNewTaskLocal, getTasksLocal, createUser, getUser})
)(ContainerApp)
export default ContainerAppCompose
