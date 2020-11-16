import Axios from "axios";


export let deleteTaskAPI = (id) => {
    return Axios.delete(`/lists/delete?id=${id}`)
}

// let axios = Axios.create({
//     // baseURL: "http://127.0.0.1:1234",
//     headers: "Authorization",
// })

Axios.defaults.headers.common['Authorization'] = localStorage.getItem('user')
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