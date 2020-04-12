import {
  GET_CONNECTIONS,
} from "../actions/types";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONNECTIONS:
      return action.payload;
    default:
      return state;
  }
};
