import { ADD_FINANCIAL } from "../actions/types";

const initialState = {
  startupId: null,
  comment: "",
  currency: "",
  revenue: "",
  cashBalance: "",
  monthlyBurn: "",
  kpis: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FINANCIAL:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
