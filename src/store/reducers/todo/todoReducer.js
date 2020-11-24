let initialState = {tasks: [], typeList: "all", user: null , auth: null};

const CREATE_NEW_USER = "CREATE_NEW_USER";
const CREATE_NEW_TASK = "CREATE_NEW_TASK";
const GET_TASKS = "GET_TASKS";
const TYPE = "TYPE";
const AUTH_USER = "AUTH_USER";

let TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE: {
            return {...state, typeList: action.text};
        }

        case CREATE_NEW_TASK: {
            return {...state, tasks: [...state.tasks, action.newTask]};
        }

        case GET_TASKS: {
            return {...state, tasks: [...action.tasks]};
        }

        case CREATE_NEW_USER : {
            return {...state, user: {...action.user}}
        }
        case AUTH_USER : {
            return {...state, auth: action.auth}
        }

        default:
            return state;
    }
};

export default TodoReducer;
