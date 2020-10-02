import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import { auth } from "./auth/AuthReducer";
import { alert } from "./alert/AlertReducer";
import { files } from "./files/FilesReducer";

let middleware = applyMiddleware(thunk);

if (process.env.NODE_ENV !== "production")
  middleware = composeWithDevTools(middleware);

const rootReducer = combineReducers({ auth, alert, files });

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, middleware);

export { store };
