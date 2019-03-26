import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import combinedReducers from "./combine_reducers";
export const logger = createLogger({ collapse: true });

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware
    // logger
  )
);

export default createStore(combinedReducers, middleware);
