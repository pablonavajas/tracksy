//root reducer
import { combineReducers } from "redux";
import startupsReducer from "./startupsReducer";
import errorsReducer from "./errorsReducer";
import messagesReducer from "./messagesReducer";
import authReducer from "./authReducer";
import investmentsReducer from "./investmentsReducer";
import kpisReducer from "./kpisReducer";
import financialsReducer from "./financialsReducer";

export default combineReducers({
  startup: startupsReducer,
  errors: errorsReducer,
  messages: messagesReducer,
  investments: investmentsReducer,
  kpis: kpisReducer,
  auth: authReducer,
  financials: financialsReducer
});
