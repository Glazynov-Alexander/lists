import { applyMiddleware, combineReducers, createStore } from "redux";
import TodoReducer from "./todoReducer";
import thunk from "redux-thunk";

let reducers = combineReducers({
  todo: TodoReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));
window.store = store;
export default store;
