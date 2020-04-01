import { ADD_FINANCIAL } from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messageActions";
import { tokenConfig } from "./authActions";
import { setLoading } from "./startupsActions";

//Getting All Startups
export const addFinancial = financialObj => async (dispatch, getState) => {
  try {
    const res = await axios.post(
      "/api/financials/",
      financialObj,
      tokenConfig(getState)
    );

    dispatch(
      createMessage({ financialAdded: "Form has been successfully submitted!" })
    );
    dispatch({
      type: ADD_FINANCIAL,
      payload: res.data
    });
  } catch (err) {
    console.log(err.response.data);
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
