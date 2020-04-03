//root reducer
import { combineReducers } from "redux";
import startupsReducer from "./startupsReducer";
import errorsReducer from "./errorsReducer";
import messagesReducer from "./messagesReducer";
import authReducer from "./authReducer";

export default combineReducers({
  startup: startupsReducer,
  errors: errorsReducer,
  messages: messagesReducer,
  auth: authReducer
});
