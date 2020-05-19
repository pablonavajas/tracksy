import {
  SET_CURRENTLY_SELECTED_JOB,
  SET_LATEST_JOB_RETRIEVED_FROM_ANGEL_LIST,
} from "../actions/types";

const initialState = {
  current: null,
  latestRetrieved: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENTLY_SELECTED_JOB:
      return {
        ...state,
        current: action.payload,
      };
    case SET_LATEST_JOB_RETRIEVED_FROM_ANGEL_LIST:
      return {
        ...state,
        latestRetrieved: action.payload,
      };
    default:
      return state;
  }
}
