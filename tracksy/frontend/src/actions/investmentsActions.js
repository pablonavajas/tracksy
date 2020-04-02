import { ADD_INVESTMENT, DELETE_INVESTMENT } from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messageActions";
import { tokenConfig } from "./authActions";
import { setLoading } from "./startupsActions";

//Getting All Startups
export const addInvestment = investment => async (dispatch, getState) => {
  try {
    console.log(investment);
    setLoading();

    const res = await axios.post(
      "/api/investments/",
      investment,
      tokenConfig(getState)
    );

    dispatch(createMessage({ investmentAdded: "Investment has been added" }));
    dispatch({
      type: ADD_INVESTMENT,
      payload: res.data
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

//Delete Investment
export const deleteInvestment = (startupId, investmetntId) => async (
  dispatch,
  getState
) => {
  try {
    setLoading();

    await axios.delete(
      `/api/investments/${startupId}/${investmetntId}/`,
      tokenConfig(getState)
    );

    dispatch({
      type: DELETE_INVESTMENT,
      payload: investmetntId
    });
  } catch (err) {
    console.log(err);
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
