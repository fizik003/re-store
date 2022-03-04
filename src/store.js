import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducers";
import thunkMiddleware from "redux-thunk";

const logMiddleware = (store) => (dispatch) => {
  return (action) => {
    console.log(action.type);
    return dispatch(action);
  };
};

const stringMiddleware = (store) => (dispatch) => (action) => {
  if (typeof action === "string") return dispatch({ type: action });
  return dispatch(action);
};

export const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, stringMiddleware, logMiddleware)
);
