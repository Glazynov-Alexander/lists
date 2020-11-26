const initialState = {tasks: null, typeList: "all", user: null, auth: ""};

const CREATE_NEW_USER = "CREATE_NEW_USER";
const CREATE_NEW_TASK = "CREATE_NEW_TASK";
const GET_TASKS = "GET_TASKS";
const TYPE = "TYPE";
const AUTH_USER = "AUTH_USER";
const UPDATE_TASK = "UPDATE_TASK";
const DELETE_TASK = "DELETE_TASK";
const DELETE_TASKS_COMPLETED = "DELETE_TASKS_COMPLETED";


const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE: {
            return {...state, typeList: action.text};
        }

        case CREATE_NEW_TASK: {
            return {...state, tasks: !state.tasks ? [action.newTask] : [...state.tasks, action.newTask]}
        }

        case GET_TASKS: {
            return {...state, tasks: [...action.tasks]};
        }
        case UPDATE_TASK: {
            return {
                ...state, tasks: state.tasks.map(el => {
                    if (el._id === action.id) {
                        return {...el, taskChecked: action.change}
                    }
                    return {...el}
                })
            };
        }


        case CREATE_NEW_USER : {
            return {...state, user: {...action.user}}
        }
        case AUTH_USER : {
            return {...state, auth: action.auth}
        }
        case DELETE_TASK : {
            return {...state,tasks: state.tasks.filter(e => e._id !== action.id)}
        }
        case DELETE_TASKS_COMPLETED : {
            return {...state,tasks: state.tasks.filter(e => e.taskChecked !== action.check)}
        }


        default:
            return state;
    }
};

export default todoReducer;
