import {createNewTask, getTasks} from "./actions";
import Axios from "axios";

export const deleteTask = (id) => async (dispatch) => {
    await Axios.delete(`/products/delete?id=${id}` )

    let globalTasks = await Axios.get("/products/get/tasks")

    return dispatch(getTasks(globalTasks.data));
};
export const deleteTasksCompleted = () => async (dispatch) => {
    let tasks = await JSON.parse(localStorage.getItem("ReactTasks"));
    if (tasks) {
        tasks = tasks.filter((elem) => elem.taskChecked === false);
        localStorage.setItem("ReactTasks", JSON.stringify(tasks));
        dispatch(getTasks(tasks));
    }
};
export const checkedLocal = (checked, id) => async (dispatch) => {
    await Axios.put("/products/update/tasks", {id, checked})
    let globalTasks = await Axios.get("/products/get/tasks")

    return dispatch(getTasks(globalTasks.data));

};
export const getTasksLocal = () => async (dispatch) => {
    let globalTasks = await Axios.get("/products/get/tasks")
    if (globalTasks.data) {
        return dispatch(getTasks(globalTasks.data));
    }
};
export const createNewTaskLocal = (newTask) => async (dispatch) => {
    await Axios.get("/products/get/tasks")
    let createTask = {
        taskChecked: false,
        textTask: newTask,
    };
    await Axios.post("/products/create/tasks", createTask)
    dispatch(createNewTask(createTask));
};