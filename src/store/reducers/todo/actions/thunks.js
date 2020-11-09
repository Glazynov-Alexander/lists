import {createNewTask, getTasks} from "./actions";
import Axios from "axios";

export const deleteTask = (id) => async (dispatch) => {


    // let tasks = await JSON.parse(localStorage.getItem("ReactTasks"));
    // if (tasks) {
    //     tasks = tasks.filter((elem) => elem.idTask !== id);
    //     localStorage.setItem("ReactTasks", JSON.stringify(tasks));
    //     dispatch(getTasks(tasks));
    // }
    console.log( typeof id)
   let a =  await Axios.delete(`/products/delete?id="${id}"` )
    console.log(a)

    // let globalTasks = await Axios.get("/products/get/tasks")
    // console.log(globalTasks.data)
    // return dispatch(getTasks(globalTasks.data));
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
    let i = 1;
    let tasks = await Axios.get("/products/get/tasks")
    if (tasks.data !== null && tasks.data.length !== 0) {
        i = tasks.data.slice(-1)[0].idTask + 1;
    }

    let createTask = {
        idTask: i,
        taskChecked: false,
        textTask: newTask,
    };

    await Axios.post("/products/create/tasks", createTask)
    dispatch(createNewTask(createTask));
};