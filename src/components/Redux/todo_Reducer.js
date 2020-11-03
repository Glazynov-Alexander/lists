let initialState = {
  tasks: [],
  typeList: "all",
};

const TEST_CHECKED = "TEST_CHECKED";
const CREATE_NEW_TASK = "CREATE_NEW_TASK";
const GET_TASKS = "GET_TASKS";
const TYPE = "TYPE";

let TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_CHECKED: {
      return {
        ...state,
        tasks: state.tasks.map((el) => {
          if (el.idTask === action.id) {
            return { ...el, taskChecked: action.checked };
          }
          return { ...el };
        }),
      };
    }

    case TYPE: {
      return {
        ...state,
        typeList: action.text,
      };
    }
    case CREATE_NEW_TASK: {
      return {
        ...state,
        tasks: [...state.tasks, action.newTask],
      };
    }
    case GET_TASKS: {
      return {
        ...state,
        tasks: [...action.tasks],
      };
    }

    default:
      return state;
  }
};
export let createNewTask = (newTask) => ({ type: CREATE_NEW_TASK, newTask });
export let getTasks = (tasks) => ({ type: GET_TASKS, tasks });
export let changeType = (text) => ({ type: TYPE, text });

export let deleteTask = (id) => async (dispatch) => {
  let tasks = await JSON.parse(localStorage.getItem("ReactTasks"));
  if (tasks) {
    tasks = tasks.filter((elem) => elem.idTask !== id);
    localStorage.setItem("ReactTasks", JSON.stringify(tasks));

    dispatch(getTasks(tasks));
  }
};
export let deleteTasksCompleted = () => async (dispatch) => {
  let tasks = await JSON.parse(localStorage.getItem("ReactTasks"));
  if (tasks) {
    tasks = tasks.filter((elem) => elem.taskChecked === false);
    localStorage.setItem("ReactTasks", JSON.stringify(tasks));
    dispatch(getTasks(tasks));
  }
};
export let checkedLocal = (checked, id) => async (dispatch) => {
  let tasks = await JSON.parse(localStorage.getItem("ReactTasks"));

  if (tasks) {
    let newtasks = tasks.map((el) => {
      if (el.idTask === id) {
        return { ...el, taskChecked: checked };
      }
      return { ...el };
    });

    localStorage.setItem("ReactTasks", JSON.stringify(newtasks));
    return dispatch(getTasks(newtasks));
  }
};
export let getTasksLocal = () => async (dispatch) => {
  let localTasks = await JSON.parse(localStorage.getItem("ReactTasks"));
  if (localTasks) {
    return dispatch(getTasks(localTasks));
  }
};

export let createNewTaskLocal = (newTask) => (dispatch) => {
  let i = 1;
  let tasks = JSON.parse(localStorage.getItem("ReactTasks"));
  if (tasks !== null && tasks.length !== 0) {
    i = tasks.slice(-1)[0].idTask + 1;
  }
  i++;
  let createTask = {
    idTask: i,
    taskChecked: false,
    textTask: newTask,
  };
  dispatch(createNewTask(createTask));

  if (tasks == null) {
    tasks = [createTask];
    return localStorage.setItem("ReactTasks", JSON.stringify(tasks));
  }

  tasks.push(createTask);
  localStorage.setItem("ReactTasks", JSON.stringify(tasks));
};

export default TodoReducer;
