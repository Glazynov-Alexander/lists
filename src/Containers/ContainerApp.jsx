import React, {Suspense} from "react";
import {connect} from "react-redux";

import {createNewTaskLocal, getTasksLocal, createUser, getUser} from "../store/reducers/todo/actions/thunks.js";
import {Redirect, Route} from "react-router";
import {Spinner} from "react-bootstrap";
import '../App.css'
// import {getTasks} from "../store/reducers/todo/actions/actions";

const ContainerLogin = React.lazy(() => import("./ContainerLogin"))

const App = React.lazy(() => import("../App"))

class ContainerApp extends React.Component {
    // componentDidMount() {
        // if(this.props.user) {
        //     console.log(this.props.user)
        //     this.props.getUser(this.props.user.name)
        //     // this.props.getTasksLocal( this.props.user._id ? this.props.user._id : null);
        // }


    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps)
        console.log(this.props.tasks)

        if(!prevProps.user) {
            this.props.getUser(this.props.user.name)
            this.props.getTasksLocal( this.props.user._id ? this.props.user._id : null);
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
            return <Suspense fallback={<Spinner className='preloader' animation="grow"/>}>
                <Redirect to="/Login"/>
                <Route path="/Login" render={() => <ContainerLogin/>}/>
            </Suspense>
        }

        return <div className="app">
            <Suspense fallback={<Spinner className="preloader" animation="grow"/>}>
                <Redirect to="/Tasks"/>
                <App symbol={this.props.user._id} createNewTask={createNewTask} tasks={this.props.tasks}/>
            </Suspense>
        </div>

    }
}

let mapStateToProps = (state) => ({tasks: state.todo.tasks, user: state.todo.user});
export default connect(mapStateToProps, {createNewTaskLocal, getTasksLocal, createUser, getUser})(ContainerApp);
