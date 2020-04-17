import * as types from "../../tracksy/frontend/src/actions/types";
import * as actions from "../../tracksy/frontend/src/actions/jobActions";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//creating a mock instance from the MockAdapter of axios
const mock = new MockAdapter(axios);

// TESTING GETTING STARTUPS FROM DATABASE ACTION
describe("In startup actions", () => {
  let token, store, error, startup, job;
  beforeEach(() => {
    token = "123456";
    store = mockStore({ auth: { token } });

    // Runs before each test in the suite
    startup = { id: 0, name: "Company1" };
    job = { id: 0, title: "A", description: "Test1" };
    error = "ServerErrorReply";
    store.clearActions();
  });

  it("addJob() should dispatch the correct action type and payload to the store", () => {
    mock.onPost(`/api/job/${startup.id}/`).reply(200, job);

    store.dispatch(actions.addJob(startup.id, job)).then(() => {
      let expectedActions = [
        {
          type: types.CREATE_MESSAGE,
          payload: { succ: "Job added successfully" },
        },
        {
          type: types.ADD_JOB,
          payload: { job, startupId: startup.id },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("addJob() should send error type and payload to the store when getting errors from API ", () => {
    mock.onPost(`/api/job/${startup.id}/`).reply(404, {
      error,
    });

    store.dispatch(actions.addJob(startup.id, job)).then(() => {
      let expectedActions = [
        {
          type: types.GET_ERRORS,
          payload: {
            msg: { error },
            status: 404,
          },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("deleteInvestment() should dispatch the correct action type and payload to the store", () => {
    mock.onDelete(`/api/job/${startup.id}/${job.id}/`).reply(200);

    store.dispatch(actions.deleteJob(startup.id, job.id)).then(() => {
      let expectedActions = [
        {
          type: types.CREATE_MESSAGE,
          payload: { succ: "Job deleted successfully" },
        },
        {
          type: types.DELETE_JOB,
          payload: { jobId: job.id, startupId: startup.id },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("deleteInvestments() should send error type and payload to the store when getting errors from API ", () => {
    mock.onDelete(`/api/job/${startup.id}/${job.id}/`).reply(404, {
      error,
    });

    store.dispatch(actions.deleteJob(startup.id, job.id)).then(() => {
      let expectedActions = [
        {
          type: types.GET_ERRORS,
          payload: {
            msg: { error },
            status: 404,
          },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("getJobDescription() should dispatch the correct action type and payload to the store", () => {
    mock.onPost("/api/jobDescription/").reply(200, job);

    store.dispatch(actions.getJobDescription()).then(() => {
      let expectedActions = [
        {
          type: types.CREATE_MESSAGE,
          payload: { succ: "Job info retrieved successfully" },
        },
        {
          type: types.SET_LATEST_JOB_RETRIEVED_FROM_ANGEL_LIST,
          payload: job,
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("getJobDescription() should send error type and payload to the store when getting errors from API ", () => {
    mock.onPost("/api/jobDescription/").reply(404, {
      error,
    });

    store.dispatch(actions.getJobDescription()).then(() => {
      let expectedActions = [
        {
          type: types.GET_ERRORS,
          payload: {
            msg: { error },
            status: 404,
          },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("setCurrentJob() should return type SET_CURRENTLY_SELECTED_JOB type", () => {
    const res = actions.setCurrentJob();
    expect(res).toEqual({ type: types.SET_CURRENTLY_SELECTED_JOB });
  });
});
