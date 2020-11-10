
export const createNewUser = (user) => ({type: "CREATE_NEW_USER", user});

export const createNewTask = (newTask) => ({type: "CREATE_NEW_TASK", newTask});
export const getTasks = (tasks) => ({type: "GET_TASKS", tasks});
export const changeType = (text) => ({type: "TYPE", text});