import {
  GET_STARTUPS,
  SET_LOADING,
  STARTUPS_ERROR,
  ADD_STARTUP,
  UPDATE_STARTUP,
  DELETE_STARTUP,
  SET_CURRENT,
  CLEAR_CURRENT,
  ADD_INVESTMENT,
  DELETE_INVESTMENT
} from "../actions/types";

const initialState = {
  investments: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_INVESTMENT:
      return {
        ...state, // state is immutable
        investments: [...state.investments, action.payload]
      };
    case DELETE_INVESTMENT:
      return {
        ...state,
        investments: state.investments.filter(
          investment => investment.id !== action.payload
        )
      };

    default:
      return state;
  }
};
