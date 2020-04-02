import { ADD_KPI_NAMES, DELETE_KPI_NAME } from "../actions/types";

const initialState = {
  kpiNames: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    // case ADD_KPI_NAMES:
    //   return {
    //     ...state, // state is immutable
    //     kpiNames: [...state.kpiNames, action.payload]
    //   };
    // case DELETE_KPI_NAME:
    //   return {
    //     ...state,
    //     kpiNames: state.kpiNames.filter(name => name.id !== action.payload)
    //   };
    default:
      return state;
  }
};
