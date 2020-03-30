import { ADD_INVESTMENT } from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messageActions";
import { tokenConfig } from "./authActions";
import { setLoading } from "./startupsActions";

//Getting All Startups
export const addInvestment = startup => async (dispatch, getState) => {
  console.log("startup in invActions");
  console.log(startup);

  try {
    setLoading();
    // console.log("startup in invActions");
    // console.log(startup);

    const res = await axios.post(
      "/api/investments/",
      startup,
      tokenConfig(getState)
    );

    console.log(res);
    dispatch(createMessage({ investmentAdded: "Investment has been added" }));
    dispatch({
      type: ADD_INVESTMENT,
      payload: res.data
    });
  } catch (err) {
    console.log("error");
    console.log(err);
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
