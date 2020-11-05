let initialState = {tasks: [], typeList: "all"};

const CREATE_NEW_TASK = "CREATE_NEW_TASK";
const GET_TASKS = "GET_TASKS";
const TYPE = "TYPE";

let TodoReducer = (state = initialState, action) => {
    switch (action.type) {
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

export default TodoReducer;
