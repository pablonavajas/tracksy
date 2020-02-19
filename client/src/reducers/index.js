//root reducer
import { combineReducers } from 'redux';
import startupsReducer from './startupsReducer';

export default combineReducers({
  startup: startupsReducer
});
