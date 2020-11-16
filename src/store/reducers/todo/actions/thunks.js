import {createNewTask, getTasks, createNewUser} from "./actions";
import {checkUpdateAPI, createTaskAPI, createUserAPI, deleteTaskAPI, deleteTasksAPI, getTasksAPI, getUserAPI, othersGetUserAPI} from "../../../../API/API";

const getTasksUniversal = (globalTasks, symbol) => {
    let tasks = globalTasks.data.tasks.filter(el => el.symbol === symbol)
    return tasks
}


export const deleteTask = (id, symbol) => async (dispatch) => {
    let globalTasks = await deleteTaskAPI(id, symbol)
    dispatch(getTasks(getTasksUniversal(globalTasks, symbol)));
    return globalTasks.data
};

export const deleteTasksCompleted = (symbol) => async (dispatch) => {
    let globalTasks = await deleteTasksAPI(symbol)
    return dispatch(getTasks(getTasksUniversal(globalTasks, symbol)));

};

export let getTasksLocal = (symbol) => async (dispatch) => {
    let globalTasks = await getTasksAPI(symbol)
    if (!globalTasks.data.tasks) {
        return globalTasks.data.status
    }
    return dispatch(getTasks(globalTasks.data.tasks));
};

export const checkedLocal = (checked, id, symbol) => async (dispatch) => {
    let globalTasks = await checkUpdateAPI(id, checked)
    return dispatch(getTasks(getTasksUniversal(globalTasks, symbol)));
};

export const createNewTaskLocal = (textTask, symbol) => async (dispatch) => {
    let task = await createTaskAPI(textTask, symbol)
    dispatch(createNewTask(task.data))
};

export const getUser = (name, password, token) => async (dispatch) => {
    let globalUsers
    if (!name && !password) {
        globalUsers = await getUserAPI('', '', token)
    }
    else if(name && password) {
        globalUsers = await getUserAPI(name, password, token)
    }

    if (!globalUsers.data.user) {
        return globalUsers.data.status
    }
    if(!localStorage.getItem('user')) {
        localStorage.setItem('user', globalUsers.data.token.token)
    }

    if (globalUsers.data) dispatch(createNewUser(globalUsers.data.user));

};

// export const othersGetUser = (name, password, token) => async (dispatch) => {
//     let globalUsers = await othersGetUserAPI(name, password, token)
//     if (!globalUsers.data.user ) {
//         return globalUsers.data.status
//     }
//     localStorage.setItem('user', JSON.stringify(globalUsers.data.token))
//     if (globalUsers.data) dispatch(createNewUser(globalUsers.data.user));
// };


export const createUser = (name, password) => async (dispatch) => {
    let a = await createUserAPI(name, password)
    if (typeof a.data === "string") {
        return a.data
    } else if (!a.data.client) {
        localStorage.setItem('user', a.data.token)
        dispatch(createNewUser(a.data.user))
        return a.data.status
    }

};