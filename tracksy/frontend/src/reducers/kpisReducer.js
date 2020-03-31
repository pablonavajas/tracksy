import { ADD_KPI_NAME } from "../actions/types";

const initialState = {
  kpiNames: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_KPI_NAME:
      return {
        ...state, // state is immutable
        kpiNames: [...state.kpiNames, action.payload]
      };
    default:
      return state;
  }
};
