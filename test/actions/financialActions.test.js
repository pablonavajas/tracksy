import * as types from "../../tracksy/frontend/src/actions/types";
import * as actions from "../../tracksy/frontend/src/actions/financialActions";

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
  let token, store, error, startup, job, financial;
  beforeEach(() => {
    token = "123456";
    store = mockStore({ auth: { token } });
    startup = { id: 0, name: "Company1" };
    financial = { id: 0, currency: "$", revenue: 10 };
    error = "ServerErrorReply";
    store.clearActions();
  });

  it("addFinancial() should dispatch the correct action type and payload to the store", () => {
    mock.onPost(`/api/financials/${startup.id}/`).reply(200, financial);

    store.dispatch(actions.addFinancial(startup.id, financial)).then(() => {
      let expectedActions = [
        {
          type: types.CREATE_MESSAGE,
          payload: { succ: "Form has been successfully submitted!" },
        },
        {
          type: types.ADD_FINANCIAL,
          payload: financial,
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("updateIntroductionStatuses() should send error type and payload to the store when getting errors from API ", () => {
    mock.onPost(`/api/financials/${startup.id}/`).reply(404, { error });

    store.dispatch(actions.addFinancial(startup.id, financial)).then(() => {
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
