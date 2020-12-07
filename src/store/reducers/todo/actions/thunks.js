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

    const globalTasks = await getTasksAPI(symbol, localStorage.getItem('user'))
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
};

export const loginAuto = () => async (dispatch) => {
    if (localStorage.getItem('refresh')) await refreshTokens()

    const token = localStorage.getItem('user')
    if (token) {
        dispatch(authUser(token))
        tokenAuthorization(token).then(async result => {
            localStorage.setItem('user', result.data.tokens.token)
            localStorage.setItem('refresh', result.data.tokens.refreshToken)
            return dispatch(createNewUser(result.data.user));
        })
    }

    dispatch(authUser(token))
};

export const logOutUse = () => async (dispatch) => {
    dispatch(authUser(""))
    localStorage.clear()
};

export const loginVK = (pathname) => async (dispatch) => {
    let tokenVk = pathname.match(/Bearer[^?]+/gm)
  
    if (tokenVk[0] && tokenVk[0].includes('Bearer') !== false) {
        localStorage.setItem("user", tokenVk[0])
        const result = await tokenAuthorization(tokenVk[0])
        dispatch(authUser(result.data.tokens.token))
        await localStorage.setItem('user', result.data.tokens.token)
        await localStorage.setItem('refresh', result.data.tokens.refreshToken)
        return dispatch(createNewUser(result.data.user));
    }
};

export const refreshTokens = async () => {
    let token = localStorage.getItem('user') || "not";
    const res = localStorage.getItem('refresh')
    let b = await jsonwebtoken.decode(res);

    if ((b && Date.now() >= b.exp * 1000) || (!b || !b.exp)) {
        localStorage.clear()
        window.location.replace('/login')
    }

    if (token ) {
        let access = token.replace('Bearer ', '')

        try {
            await jsonwebtoken.verify(access, "access");
        } catch (e) {
            let tokens = await refreshTokensAPI(localStorage.getItem("refresh"))
            if (tokens.data.tokens) {
                localStorage.setItem('user', tokens.data.tokens.token)
                localStorage.setItem('refresh', tokens.data.tokens.refreshToken)
                return
            }
        }
    }
    // localStorage.clear()

    return 'error'
};