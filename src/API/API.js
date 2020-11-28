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
    return Axios.get(`/auth/token-authorization`, {params: {user: token}})
}
export const repeat = async (vid, url, par) => {
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem('user')
debugger
    switch (vid) {
        case "put": {
            return await Axios.put(url, JSON.parse(par))
        }
        case "post": {
            return await Axios.post(url, JSON.parse(par))
        }
        case "get": {
            return await Axios.get(url)
        }
        case "delete": {
            return await Axios.delete(url)
        }
        default :
            return "error"
    }
    // Axios.get(`/auth/token-authorization`, {params: {user: token}})
}


Axios.interceptors.request.use(req => {

    return req;
}, async err => {


    await refreshTokensAPI(localStorage.getItem('refresh'))

    // return err.response
    return
});


Axios.interceptors.response.use(response => {

        if (response.data.tokens) {

            localStorage.setItem('user', response.data.tokens.token)
            localStorage.setItem('refresh', response.data.tokens.refreshToken)
            // window.location.replace('/tasks');

        }
        return response;
    }
    , async err => {

        // if (err.response.status === 403 && err.config && !err.config.__isRetryRequest) {
        let a = err.response.config.url
        let b = err.response.config.data
        let c = err.response.config.method
        await refreshTokensAPI(localStorage.getItem('refresh'))

        let cd = await repeat(c, a, b)
        return cd
    });
