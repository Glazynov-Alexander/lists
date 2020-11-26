import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import todoReducer from "./reducers/todo/todoReducer";
import thunk from "redux-thunk";

let reducers = combineReducers({
  todo: todoReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
window.store = store;
export default store;
