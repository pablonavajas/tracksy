//root reducer
import { combineReducers } from "redux";
import startupsReducer from "./startupsReducer";
import errorsReducer from "./errorsReducer";
import messagesReducer from "./messagesReducer";
import authReducer from "./authReducer";
import jobsReducer from "./jobsReducer";
import connectionsReducer from "./connectionsReducer";


export default combineReducers({
  startup: startupsReducer,
  jobs: jobsReducer,
  errors: errorsReducer,
  messages: messagesReducer,
  auth: authReducer,
  connections: connectionsReducer
});
