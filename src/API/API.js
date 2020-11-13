import Axios from "axios";




export let deleteTaskAPI = (id) => {
    return Axios.delete(`/lists/delete?id=${id}`)
}

// let axios = Axios.create({
//     baseURL: "http://127.0.0.1:1234",
//     headers: ""
// })

export let deleteTasksAPI = (symbol) => {
    return Axios.delete(`/lists/tasks/delete?symbol=${symbol}`)
}


export let createTaskAPI = (textTask, symbol) => {
    return Axios.post("/lists/create/tasks", {taskChecked: false, textTask, symbol})
}

export let getTasksAPI = (symbol) => {
    return Axios.get(`/lists/get/tasks?symbol=${symbol}`)
}

export let checkUpdateAPI = (id, checked) => {
    return Axios.put("/lists/update/tasks", {id, checked})
}


export let createUserAPI = (name, password) => {
    return Axios.post("/lists/create/user", {name, password})
}


export let getUserAPI = (name, password) => {
    return Axios.get(`/lists/user`, {params: {"name": name, "password": password}})

}