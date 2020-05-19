import { UPDATE_INTRODUCTION_STATUS } from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messageActions";
import { tokenConfig } from "./authActions";

//Update Startup
export const updateIntroductionsStatuses = (
  startupId,
  jobId,
  introduction
) => async (dispatch, getState) => {
  try {
    // setLoading();

    const res = await axios.put(
      `/api/introduction/${startupId}/${jobId}/${introduction.id}/`,
      introduction,
      tokenConfig(getState)
    );

    dispatch(
      createMessage({ succ: "Introduction Statuses Updated Successfully" })
    );

    dispatch({
      type: UPDATE_INTRODUCTION_STATUS,
      payload: { startupId, jobId, introduction: res.data },
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
  }
};
