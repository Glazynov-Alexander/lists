import {createNewTask, getTasks, createNewUser, authUser, upTasks, deleteTaskAC} from "./actions";
import {checkUpdateAPI, createTaskAPI, createUserAPI, deleteTaskAPI, deleteTasksAPI, getTasksAPI, getUserAPI, tasksCheckedAPI, refreshTokensAPI, tokenAuthorization} from "../../../../API/API";

export const deleteTask = (id, symbol) => async (dispatch) => {
    const globalTasks = await deleteTaskAPI(id, symbol)
    await dispatch(deleteTaskAC(globalTasks.data.id))
    return globalTasks.data
};

export const deleteTasksCompleted = (symbol) => async (dispatch) => {
    const globalTasks = await deleteTasksAPI(symbol)
    return dispatch(getTasks(globalTasks.data.tasks));
};

export const getTasksLocal = (symbol) => async (dispatch) => {
    const globalTasks = await getTasksAPI(symbol)
    if (!globalTasks.data.tasks) return globalTasks.data.status
    return dispatch(getTasks(globalTasks.data.tasks));
};

export const checkedLocal = (checked, id) => async (dispatch) => {
    const globalTasks = await checkUpdateAPI(id, checked)
    return dispatch(upTasks(globalTasks.data.task.id, globalTasks.data.task.taskChecked))
};

export const tasksCheckeds = (checked) => async (dispatch) => {
    const globalTasks = await tasksCheckedAPI(checked)
    return dispatch(getTasks(globalTasks.data.tasks));
};

export const createNewTaskLocal = (textTask, symbol) => async (dispatch) => {
    const task = await createTaskAPI(textTask, symbol)
    dispatch(createNewTask(task.data))
    return task
};

export const getUser = (name, password, token) => async (dispatch) => {
    let globalUsers
    globalUsers = await getUserAPI(name, password, token)
    if (!globalUsers.data.user) {
        return globalUsers.data.status
    }
    if (!localStorage.getItem('user')) {
        localStorage.setItem('user', globalUsers.data.tokens.token)
        localStorage.setItem('refresh', globalUsers.data.tokens.refreshToken)
    }
    dispatch(authUser(localStorage.getItem('user')))
    dispatch(createNewUser(globalUsers.data.user));
    return globalUsers.data
};


export const createUser = (name, password) => async (dispatch) => {
    const response = await createUserAPI(name, password)
    if (!response.data.user) {
        return response.data.status
    } else if (!response.data.client) {
        localStorage.setItem('user', response.data.token.token)
        localStorage.setItem('refresh', response.data.token.refreshToken)
        await dispatch(authUser(true))
        dispatch(createNewUser(response.data.user))
        return response.data.status
    }

};

export const refreshTokens = () => async (dispatch) => {
    const response = await refreshTokensAPI()
    window.location.replace('/tasks');
    localStorage.setItem('user', response.data.token)
    localStorage.setItem('refresh', response.data.refreshToken)
};

export const logOutUse = () => async (dispatch) => {
    dispatch(authUser(""))
    localStorage.removeItem("user")
};

export const loginAuto = () => async (dispatch) => {
    const token = localStorage.getItem('user')
    if (token) {
        dispatch(authUser(token))
        const result = await tokenAuthorization(token)
        dispatch(createNewUser(result.data.user));
    } else {
        return "not token"
    }

};


