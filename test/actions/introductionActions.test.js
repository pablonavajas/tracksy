import * as types from "../../tracksy/frontend/src/actions/types";
import * as actions from "../../tracksy/frontend/src/actions/introductionActions";

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
  let token, store, error, startup, job, introduction;
  beforeEach(() => {
    token = "123456";
    store = mockStore({ auth: { token } });
    startup = { id: 0, name: "Company1" };
    introduction = { id: 0, status: "ok" };
    job = { id: 0, title: "A", description: "Test1" };
    error = "ServerErrorReply";
    store.clearActions();
  });

  it("updateIntroductionStatuses() should dispatch the correct action type and payload to the store", () => {
    mock
      .onPut(`/api/introduction/${startup.id}/${job.id}/${introduction.id}/`)
      .reply(200, introduction);

    store
      .dispatch(
        actions.updateIntroductionsStatuses(startup.id, job.id, introduction)
      )
      .then(() => {
        let expectedActions = [
          {
            type: types.CREATE_MESSAGE,
            payload: { succ: "Introduction Statuses Updated Successfully" },
          },
          {
            type: types.UPDATE_INTRODUCTION_STATUS,
            payload: { startupId: startup.id, jobId: job.id, introduction },
          },
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it("updateIntroductionStatuses() should send error type and payload to the store when getting errors from API ", () => {
    mock
      .onPut(`/api/introduction/${startup.id}/${job.id}/${introduction.id}/`)
      .reply(404, { error });

    store
      .dispatch(
        actions.updateIntroductionsStatuses(startup.id, job.id, introduction)
      )
      .then(() => {
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
});
