import { ADD_KPI_NAME, DELETE_KPI_NAME } from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messageActions";
import { tokenConfig } from "./authActions";
import { setLoading } from "./startupsActions";

//Getting All Startups
export const addKpiName = kpiNameObj => async (dispatch, getState) => {
  try {
    setLoading();

    const res = await axios.post(
      "/api/kpiNames/",
      kpiNameObj,
      tokenConfig(getState)
    );

    // console.log(res);
    // dispatch(createMessage({ kpiNameAdded: "kpi Name has been added" }));
    dispatch({
      type: ADD_KPI_NAME,
      payload: res.data
    });
  } catch (err) {
    // console.log("error");
    // console.log(err);
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

//Delete Startup
export const deleteKpiName = (startupId, kpiId) => async (
  dispatch,
  getState
) => {
  try {
    setLoading();

    await axios.delete(
      `/api/kpiNames/${startupId}/${kpiId}/`,
      tokenConfig(getState)
    );

    dispatch({
      type: DELETE_KPI_NAME,
      payload: kpiId
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
