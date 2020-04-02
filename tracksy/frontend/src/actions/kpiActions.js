import { ADD_KPI_NAMES, DELETE_KPI_NAME } from "./types";
import axios from "axios";
import { returnErrors } from "./messageActions";
import { tokenConfig } from "./authActions";
import { setLoading } from "./startupsActions";

// Adding a List of KPI names
export const addKpiNames = (startupId, kpiNames) => async (
  dispatch,
  getState
) => {
  try {
    setLoading();

    const res = await axios.post(
      `/api/kpiNames/${startupId}/`,
      kpiNames,
      tokenConfig(getState)
    );

    // dispatch(createMessage({ kpiNameAdded: "kpi Name has been added" }));
    dispatch({
      type: ADD_KPI_NAMES,
      payload: { kpiNames: res.data, startupId }
    });

    console.log(res.data);
  } catch (err) {
    console.log("error");
    console.log(err);
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};

//Delete Kpi Name
export const deleteKpiName = (startupId, kpiNameId) => async (
  dispatch,
  getState
) => {
  try {
    setLoading();

    await axios.delete(
      `/api/kpiNames/${startupId}/${kpiNameId}/`,
      tokenConfig(getState)
    );

    dispatch({
      type: DELETE_KPI_NAMES,
      payload: kpiId
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
