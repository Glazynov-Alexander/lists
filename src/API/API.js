import Axios from "axios";


Axios.defaults.headers.common['Authorization'] = localStorage.getItem('user')


//tasks
export let deleteTaskAPI = (id) => {
    return Axios.delete(`/lists/delete?id=${id}`)
}

export let deleteTasksAPI = (symbol) => {
    return Axios.delete(`/lists/tasks/delete?symbol=${symbol}`)
}

export let createTaskAPI = (textTask, symbol) => {
    return Axios.post("/lists/create/tasks", {taskChecked: false, textTask, symbol})
}

export let getTasksAPI = (symbol) => {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('user')
    return Axios.get(`/lists/get/tasks?symbol=${symbol}`)
}

export let checkUpdateAPI = (id, checked) => {
    return Axios.put("/lists/update/tasks", {id, checked})
}
export let tasksCheckedAPI = (checked) => {
    return Axios.put("/lists/update/checkeds", {checked})
}


//user
export let createUserAPI = (name, password) => {
    return Axios.post("/auth/registration", {name, password})
}
export let getUserAPI = async (name, password, token) => {
    Axios.defaults.headers.common['Authorization'] = token
    return Axios.get(`/auth/login`, {params: {user: token, name, password}})

}

export let othersGetUserAPI = (name, password, token) => {
    return Axios.get(`/auth/login`, {params: {"name": name, "password": password}})
}


//tokens
export let refreshTokensAPI = () => {
    return Axios.post(`/auth/refresh-tokens`, {refresh: localStorage.getItem('refresh')})
}
