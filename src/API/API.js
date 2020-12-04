import Axios from "axios";

Axios.defaults.headers.common['Authorization'] = localStorage.getItem('user')
if (localStorage.getItem('user') && localStorage.getItem('user').includes('Bearer') === false) {
    localStorage.removeItem("user")
}
let axios = Axios.create({
    headers: {'Authorization': localStorage.getItem('user')},
    baseURL: "https://backendtodos2.herokuapp.com"
})

//tasks
export const deleteTaskAPI = (id) => {
    return axios.delete(`/lists/task/delete?id=${id}`)
}

export const deleteTasksAPI = (symbol) => {
    return axios.delete(`/lists/tasks/deletes?symbol=${symbol}`)
}

export const createTaskAPI = (textTask, symbol) => {
    return axios.post("/lists/task/create", {taskChecked: false, textTask, symbol})
}

export const getTasksAPI = (symbol) => {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('user')
    return axios.get(`/lists/get/tasks?symbol=${symbol}`)
}

export const checkUpdateAPI = (id, checked) => {
    return axios.put("/lists/task/update", {id, checked})
}
export const tasksCheckedAPI = (checked) => {
    return axios.put("/lists/tasks/updates", {checked})
}


//user
export const createUserAPI = (name, password) => {
    return axios.post("/auth/registration", {name, password})
}
export const getUserAPI = async (name, password, token) => {
    Axios.defaults.headers.common['Authorization'] = token
    return axios.get(`/auth/login`, {params: {user: token, name, password}})
}

export const othersGetUserAPI = (name, password, token) => {
    return axios.get(`/auth/login`, {params: {"name": name, "password": password}})
}


//tokens
export const refreshTokensAPI = (ref) => {
    return axios.post(`/auth/refresh-tokens`, {refresh: ref})
}

export const tokenAuthorization = (token) => {
    Axios.defaults.headers.common['Authorization'] = token
    return axios.get(`/auth/token-authorization`, {params: {user: token}})
}


Axios.interceptors.response.use(response => {
        return response

    }
    , async err => {
        return err.response
    });
