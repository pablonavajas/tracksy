import {
  GET_STARTUPS,
  SET_LOADING,
  STARTUPS_ERROR,
  ADD_STARTUP,
  UPDATE_STARTUP,
  DELETE_STARTUP,
  SET_CURRENT,
  CLEAR_CURRENT
} from '../actions/types';

const initialState = {
  startups: null,
  current: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STARTUPS:
      return {
        ...state,
        startups: action.payload,
        loading: false 
      }
    case ADD_STARTUP:
      return {
        ...state,
        //state is immutable
        startups: [...state.startups, action.payload],
        loading: false
      };
    case UPDATE_STARTUP:
      return {
        ...state,
        startups: state.startups.map(startup =>
          startup.id === action.payload.id ? action.payload : startup
        )
      };
    case DELETE_STARTUP:
      return {
        ...state,
        startups: state.startups.filter(
          startup => startup.id !== action.payload
        ),
        loading: false
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case STARTUPS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
