

export const createNewUser = (user) => ({type: "CREATE_NEW_USER", user});
export const authUser = (auth) => ({type: "AUTH_USER", auth});
export const createNewTask = (newTask) => ({type: "CREATE_NEW_TASK", newTask});
export const getTasks = (tasks) => ({type: "GET_TASKS", tasks});
export const changeType = (text) => ({type: "TYPE", text});
export const upTasks = (id, change) => ({type: "UPDATE_TASK", id, change});
export const upTasksCompleted = ( change) => ({type: "UPDATE_TASKS_COMPLETED",  change});
export const deleteTaskAC = (id) => ({type: "DELETE_TASK", id});
export const deleteTasksCompletedAC = (check) => ({type: "DELETE_TASKS_COMPLETED", check});


