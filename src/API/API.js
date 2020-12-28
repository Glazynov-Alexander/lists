import Axios from "axios";

if (localStorage.getItem('user') && localStorage.getItem('user').includes('Bearer') === false) {
    localStorage.removeItem("user")
}
let axios = Axios.create({
    baseURL: "https://backendtodos2.herokuapp.com"
})
axios.defaults.headers.common['Authorization'] = localStorage.getItem('user')

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

export const getTasksAPI = async (symbol, token) => {
    axios.defaults.headers.common['Authorization'] = token
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
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`/auth/login`, {params: {user: token, name, password}})
}

export const othersGetUserAPI = (name, password) => {
    return axios.get(`/auth/login`, {params: {"name": name, "password": password}})
}


//tokens
export const refreshTokensAPI = (ref) => {
    return axios.post(`/auth/refresh-tokens`, {refresh: ref}).then(response => {
        if (response.data.tokens) {
            axios.defaults.headers.common['Authorization'] = response.data.tokens.token
            localStorage.setItem('user', response.data.tokens.token)
            localStorage.setItem('refresh', response.data.tokens.refreshToken)
            return
        }
    })
}

export const tokenAuthorization = (token) => {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`/auth/token-authorization`, {params: {user: token}})
}

axios.interceptors.response.use(res => res, error => error.response)