import { ADD_INVESTMENT } from "./types";
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
