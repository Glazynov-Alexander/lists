import {createNewTask, getTasks, createNewUser} from "./actions";
import Axios from "axios";

const getTasksUniversal  = () => {

}

export const deleteTask = (id, symbol) => async (dispatch) => {
    let globalTasks = await Axios.delete(`/products/delete?id=${id}`)
    let tasks = globalTasks.data.tasks.filter(el => el.symbol === symbol)
    return dispatch(getTasks(tasks));
};
export const deleteTasksCompleted = (symbol) => async (dispatch) => {
    let globalTasks = await Axios.delete(`/products/tasks/delete?symbol=${symbol}`)
    let tasks = globalTasks.data.tasks.filter(el => el.symbol === symbol)
    return dispatch(getTasks(tasks));
};
export let getTasksLocal = (symbol) => async (dispatch) => {
    let globalTasks = await Axios.get(`/products/get/tasks?symbol=${symbol}`)
    if (globalTasks.data) {
        return dispatch(getTasks(globalTasks.data));
    }
};
export const checkedLocal = (checked, id, symbol) => async (dispatch) => {
    let globalTasks = await Axios.put("/products/update/tasks", {id, checked})
    let tasks = globalTasks.data.tasks.filter(el => el.symbol === symbol)
    return dispatch(getTasks(tasks));
};
export const createNewTaskLocal = (newTask, symbol) => async (dispatch) => {
    let createTask = {
        taskChecked: false,
        textTask: newTask,
        symbol: symbol
    };
    let a = await Axios.post("/products/create/tasks", createTask)
    dispatch(createNewTask(a.data));
};



export const getUser = (name) => async (dispatch) => {
    let globalUsers = await Axios.get(`/products/user?name=${name}`)
    if (globalUsers.data)  dispatch(createNewUser(globalUsers.data.user[0]));
};
export const createUser = (name, password) => async (dispatch) => {
    let a = await Axios.post("/products/create/user", {name, password})
    if (!a.data.client) {
        localStorage.setItem('user', JSON.stringify(a.data.user))
        return dispatch(createNewUser(a.data.user))
    }
        localStorage.setItem('user', JSON.stringify(a.data.client[0]))
        return dispatch(createNewUser(a.data.client[0]))
};