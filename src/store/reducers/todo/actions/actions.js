const CREATE_NEW_TASK = "CREATE_NEW_TASK";
const GET_TASKS = "GET_TASKS";
const TYPE = "TYPE";


export const createNewTask = (newTask) => ({type: CREATE_NEW_TASK, newTask});
export const getTasks = (tasks) => ({type: GET_TASKS, tasks});
export const changeType = (text) => ({type: TYPE, text});