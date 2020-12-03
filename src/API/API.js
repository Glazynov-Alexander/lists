import Axios from "axios";

Axios.defaults.headers.common['Authorization'] = localStorage.getItem('user')
if (localStorage.getItem('user') && localStorage.getItem('user').includes('Bearer') === false) {
    localStorage.removeItem("user")
}

//tasks
export const deleteTaskAPI = (id) => {
    return Axios.delete(`/lists/task/delete?id=${id}`)
}

export const deleteTasksAPI = (symbol) => {
    return Axios.delete(`/lists/tasks/deletes?symbol=${symbol}`)
}

export const createTaskAPI = (textTask, symbol) => {
    return Axios.post("/lists/task/create", {taskChecked: false, textTask, symbol})
}

export const getTasksAPI = (symbol) => {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('user')
    return Axios.get(`/lists/get/tasks?symbol=${symbol}`)
}

export const checkUpdateAPI = (id, checked) => {
    return Axios.put("/lists/task/update", {id, checked})
}
export const tasksCheckedAPI = (checked) => {
    return Axios.put("/lists/tasks/updates", {checked})
}


//user
export const createUserAPI = (name, password) => {
    return Axios.post("/auth/registration", {name, password})
}
export const getUserAPI = async (name, password, token) => {
    Axios.defaults.headers.common['Authorization'] = token
    return Axios.get(`/auth/login`, {params: {user: token, name, password}})
}

export const othersGetUserAPI = (name, password, token) => {
    return Axios.get(`/auth/login`, {params: {"name": name, "password": password}})
}


//tokens
export const refreshTokensAPI = (ref) => {
    return Axios.post(`/auth/refresh-tokens`, {refresh: ref})
}

export const tokenAuthorization = (token) => {
    Axios.defaults.headers.common['Authorization'] = token
    return Axios.get(`/auth/token-authorization`, {params: {user: token}})
}


Axios.interceptors.response.use(response => {
            return response

    }
    , async err => {
        return err.response
    });
