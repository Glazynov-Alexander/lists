import React, {Suspense} from "react";
import {connect} from "react-redux";
import {createNewTaskLocal, getTasksLocal, createUser, getUser} from "../store/reducers/todo/actions/thunks.js";
import {Redirect, Route, withRouter} from "react-router";
import {Button, Spinner} from "react-bootstrap";
import '../App.css'
import {compose} from "redux";

const ContainerRegistration = React.lazy(() => import("./ContainerRegistration"))
const ContainerLogin = React.lazy(() => import("./ContainerLogin"))
const App = React.lazy(() => import("../App"))

class ContainerApp extends React.Component {
    async componentDidMount() {
        let auth = await JSON.parse(localStorage.getItem('user'))
        if (!this.props.user && auth) {
            await this.props.getUser(auth.name, auth.password)
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user === null && this.props.user !== null && prevProps.user !== this.props.user.name) {
            this.props.getUser(this.props.user.name, this.props.user.password)
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
                <div className="loginButtons">
                    <Button variant="dark" onClick={() => this.props.history.push('/Registration')} >Registration</Button>
                    <Button variant="dark" onClick={() => this.props.history.push('/Login')}>Login</Button>
                </div>
                <Suspense fallback={<Spinner className='preloader' animation="grow"/>}>
                    <Route path="/Login" render={() => <ContainerLogin/>}/>
                    <Route path="/Registration" render={() => <ContainerRegistration/>}/>
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
