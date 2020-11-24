import {createNewTask, getTasks, createNewUser, authUser} from "./actions";
import {checkUpdateAPI, createTaskAPI, createUserAPI, deleteTaskAPI, deleteTasksAPI, getTasksAPI, getUserAPI, tasksCheckedAPI, refreshTokensAPI} from "../../../../API/API";


export const deleteTask = (id, symbol) => async (dispatch) => {
    let globalTasks = await deleteTaskAPI(id, symbol)
    dispatch(getTasks(globalTasks.data.tasks));
    return globalTasks.data
};

export const deleteTasksCompleted = (symbol) => async (dispatch) => {
    let globalTasks = await deleteTasksAPI(symbol)
    return dispatch(getTasks(globalTasks.data.tasks));
};

export let getTasksLocal = (symbol) => async (dispatch) => {
    let globalTasks = await getTasksAPI(symbol)
    if (!globalTasks.data.tasks) return globalTasks.data.status
    return dispatch(getTasks(globalTasks.data.tasks));
};

export const checkedLocal = (checked, id) => async (dispatch) => {
    let globalTasks = await checkUpdateAPI(id, checked)
    return dispatch(getTasks(globalTasks.data.tasks));
};

export const tasksCheckeds = (checked) => async (dispatch) => {
    let globalTasks = await tasksCheckedAPI(checked)
    return dispatch(getTasks(globalTasks.data.tasks));
};

export const createNewTaskLocal = (textTask, symbol) => async (dispatch) => {
    let task = await createTaskAPI(textTask, symbol)
    dispatch(createNewTask(task.data))
};

export const getUser = (name, password, token) => async (dispatch) => {
    let globalUsers
    globalUsers = await getUserAPI(name, password, token)
    if (!globalUsers.data.user) return globalUsers.data.status
    if (!localStorage.getItem('user')) {
        localStorage.setItem('user', globalUsers.data.tokens.token)
        localStorage.setItem('refresh', globalUsers.data.tokens.refreshToken)
    }

    dispatch(createNewUser(globalUsers.data.user));
    dispatch(authUser(true))
};


export const createUser = (name, password) => async (dispatch) => {
    let response = await createUserAPI(name, password)
    if (typeof response.data.message === "string") {
        return response.data.message
    } else if (!response.data.client) {
        localStorage.setItem('user', response.data.token.token)
        localStorage.setItem('refresh', response.data.token.refreshToken)
        dispatch(authUser(true))
        dispatch(createNewUser(response.data.user))
        return response.data.status
    }

};

export const refreshTokens = () => async (dispatch) => {
    let response = await refreshTokensAPI()
    window.location.replace('/tasks');
    localStorage.setItem('user', response.data.token)
    localStorage.setItem('refresh', response.data.refreshToken)
};


