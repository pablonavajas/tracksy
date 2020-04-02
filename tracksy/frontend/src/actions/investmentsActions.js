import { ADD_INVESTMENTS, DELETE_INVESTMENT } from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messageActions";
import { tokenConfig } from "./authActions";
import { setLoading } from "./startupsActions";

//Getting All Startups
export const addInvestments = (startupId, investments) => async (
  dispatch,
  getState
) => {
  try {
    const res = await axios.post(
      `/api/investments/${startupId}/`,
      investments,
      tokenConfig(getState)
    );

    dispatch(
      createMessage({
        investmentsAdded: "Investments added/edited successfully"
      })
    );
    console.log("dispatching action to add investments");
    dispatch({
      type: ADD_INVESTMENTS,
      payload: { investments: res.data, startupId }
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

//Delete Investment
export const deleteInvestment = (startupId, investmentId) => async (
  dispatch,
  getState
) => {
  try {
    await axios.delete(
      `/api/investments/${startupId}/${investmentId}/`,
      tokenConfig(getState)
    );

    dispatch({
      type: DELETE_INVESTMENT,
      payload: { investmentId, startupId }
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
