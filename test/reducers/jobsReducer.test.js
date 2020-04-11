import reducer from "../../tracksy/frontend/src/reducers/jobsReducer";
import * as types from "../../tracksy/frontend/src/actions/types";

const initialState = {
  current: null,
  latestRetrieved: null,
};

const newJob = {
  id: 0,
  title: "some job",
  description: "some interesting job description",
  url: "https://angel.co/company/some-company/jobs/cloud-engineer",
};

describe("Errors reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SET_CURRENTLY_SELECTED_JOB", () => {
    const res = reducer(initialState, {
      type: types.SET_CURRENTLY_SELECTED_JOB,
      payload: newJob,
    });
    expect(res).toEqual({ current: newJob, latestRetrieved: null });
  });

  it("should handle SET_CURRENTLY_SELECTED_JOB", () => {
    const res = reducer(initialState, {
      type: types.SET_LATEST_JOB_RETRIEVED_FROM_ANGEL_LIST,
      payload: newJob,
    });
    expect(res).toEqual({ current: null, latestRetrieved: newJob });
  });
});
