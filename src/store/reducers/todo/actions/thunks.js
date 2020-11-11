import {createNewTask, getTasks, createNewUser} from "./actions";
import Axios from "axios";

const getTasksUniversal = (globalTasks, symbol) => {
    let tasks = globalTasks.data.tasks.filter(el => el.symbol === symbol)
    return tasks
}


export const deleteTask = (id, symbol) => async (dispatch) => {
    let globalTasks = await Axios.delete(`/products/delete?id=${id}`)
    return dispatch(getTasks(getTasksUniversal(globalTasks, symbol)));
};
export const deleteTasksCompleted = (symbol) => async (dispatch) => {
    let globalTasks = await Axios.delete(`/products/tasks/delete?symbol=${symbol}`)
    return dispatch(getTasks(getTasksUniversal(globalTasks, symbol)));
};
export let getTasksLocal = (symbol) => async (dispatch) => {
    let globalTasks = await Axios.get(`/products/get/tasks?symbol=${symbol}`)
    if (globalTasks.data) {
        return dispatch(getTasks(globalTasks.data));
    }
};
export const checkedLocal = (checked, id, symbol) => async (dispatch) => {
    let globalTasks = await Axios.put("/products/update/tasks", {id, checked})
    return dispatch(getTasks(getTasksUniversal(globalTasks, symbol)));
};
export const createNewTaskLocal = (textTask, symbol) => async (dispatch) => {
    let a = await Axios.post("/products/create/tasks", {taskChecked: false, textTask, symbol})
    dispatch(createNewTask(a.data));
};


export const getUser = (name) => async (dispatch) => {
    let globalUsers = await Axios.get(`/products/user?name=${name}`)
    if (globalUsers.data) dispatch(createNewUser(globalUsers.data.user[0]));
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