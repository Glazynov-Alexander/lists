import {createNewTask, getTasks} from "./actions";

export const deleteTask = (id) => async (dispatch) => {
    let tasks = await JSON.parse(localStorage.getItem("ReactTasks"));
    if (tasks) {
        tasks = tasks.filter((elem) => elem.idTask !== id);
        localStorage.setItem("ReactTasks", JSON.stringify(tasks));
        dispatch(getTasks(tasks));
    }
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
    let tasks = await JSON.parse(localStorage.getItem("ReactTasks"));

    if (tasks) {
        let newTasks = tasks.map((el) => {
            if (el.idTask === id) {
                return {...el, taskChecked: checked};
            }
            return {...el};
        });

        localStorage.setItem("ReactTasks", JSON.stringify(newTasks));
        return dispatch(getTasks(newTasks));
    }
};
export const getTasksLocal = () => async (dispatch) => {
    let localTasks = await JSON.parse(localStorage.getItem("ReactTasks"));
    if (localTasks) {
        return dispatch(getTasks(localTasks));
    }
};
export const createNewTaskLocal = (newTask) => (dispatch) => {
    let i = 1;
    let tasks = JSON.parse(localStorage.getItem("ReactTasks"));
    if (tasks !== null && tasks.length !== 0) {
        i = tasks.slice(-1)[0].idTask + 1;
    }
    i++;
    let createTask = {
        idTask: i,
        taskChecked: false,
        textTask: newTask,
    };
    dispatch(createNewTask(createTask));

    if (tasks == null) {
        tasks = [createTask];
        return localStorage.setItem("ReactTasks", JSON.stringify(tasks));
    }

    tasks.push(createTask);
    localStorage.setItem("ReactTasks", JSON.stringify(tasks));
};