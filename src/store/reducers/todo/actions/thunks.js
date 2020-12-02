import {
    createNewTask,
    getTasks,
    createNewUser,
    authUser,
    upTasks,
    deleteTaskAC,
    deleteTasksCompletedAC,
    upTasksCompleted
} from "./actions";
import {
    checkUpdateAPI,
    createTaskAPI,
    createUserAPI,
    deleteTaskAPI,
    deleteTasksAPI,
    getTasksAPI,
    getUserAPI,
    tasksCheckedAPI,
    refreshTokensAPI,
    tokenAuthorization
} from "../../../../API/API";
import jsonwebtoken from "jsonwebtoken";
import Axios from "axios";

export const deleteTask = (id, symbol) => async (dispatch) => {
    await refreshTokens()
    const globalTasks = await deleteTaskAPI(id, symbol)
    await dispatch(deleteTaskAC(globalTasks.data.id))
    return globalTasks.data
};

export const deleteTasksCompleted = (symbol) => async (dispatch) => {
    await refreshTokens()

    const globalTasks = await deleteTasksAPI(symbol)
    await dispatch(deleteTasksCompletedAC(globalTasks.data.taskChecked))
};

export const getTasksLocal = (symbol) => async (dispatch) => {
    await refreshTokens()

    const globalTasks = await getTasksAPI(symbol)
    if (!globalTasks.data.tasks) return globalTasks.data.status
    return dispatch(getTasks(globalTasks.data.tasks));
};

export const checkedLocal = (checked, id) => async (dispatch) => {
    await refreshTokens()

    const globalTasks = await checkUpdateAPI(id, checked)

    return dispatch(upTasks(globalTasks.data.task.id, globalTasks.data.task.taskChecked))
};

export const tasksCheckeds = (checked) => async (dispatch) => {
    await refreshTokens()

    const globalTasks = await tasksCheckedAPI(checked)
    dispatch(upTasksCompleted(globalTasks.data.taskChecked))
};

export const createNewTaskLocal = (textTask, symbol) => async (dispatch) => {
    await refreshTokens()

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
    await refreshTokens()
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

export const logOutUse = () => async (dispatch) => {
    dispatch(authUser(""))
    localStorage.removeItem("user")
};

export const loginAuto = () => async (dispatch) => {
    await refreshTokens()


    const token = localStorage.getItem('user')
    if (token) {
        dispatch(authUser(token))
        const result = await tokenAuthorization(token)
        dispatch(createNewUser(result.data.user));
    }
};

export const refreshTokens = async () => {
    const token = localStorage.getItem('user');
    const res = localStorage.getItem('refresh')
    let b = await jsonwebtoken.decode(res);
    
    if (b && Date.now() >= b.exp * 1000 ) {
        localStorage.clear()
        window.location.replace('/login')
    }
    if (token) {
        let access = token.replace('Bearer ', '')
        try {
            await jsonwebtoken.verify(access, "access");
        } catch (e) {
            let tokens = await refreshTokensAPI(localStorage.getItem("refresh"))
            if (tokens.data.tokens) {
                Axios.defaults.headers.common['Authorization'] = tokens.data.tokens.token
                localStorage.setItem('user', tokens.data.tokens.token)
                localStorage.setItem('refresh', tokens.data.tokens.refreshToken)
                return
            }

        }
    }
    return 'error'
};