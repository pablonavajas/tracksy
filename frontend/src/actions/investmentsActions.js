import { ADD_INVESTMENTS, DELETE_INVESTMENT } from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messageActions";
import { tokenConfig } from "./authActions";

// Add a list of investments
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
        succ: "Investments added/edited successfully"
      })
    );
    dispatch(returnErrors(res.data.errors, null));
    dispatch({
      type: ADD_INVESTMENTS,
      payload: { investments: res.data.added, startupId }
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
    dispatch(
      createMessage({
        succ: "Investment deleted successfully"
      })
    );

    dispatch({
      type: DELETE_INVESTMENT,
      payload: { investmentId, startupId }
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
