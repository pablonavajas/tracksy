import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import "../setupTests";

import { Redirect, HashRouter as Router } from "react-router-dom";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { getStartups } from "../../tracksy/frontend/src/actions/startupsActions";
import { addFinancial } from "../../tracksy/frontend/src/actions/financialActions";
import StartupForm from "../../tracksy/frontend/src/components/startupForm/StartupForm";

const mockStore = configureMockStore([thunk]);

const startups = [
  {
    id: 0,
    name: "company1",
    financials: [],
    kpinames: [],
    jobs: [],
  },
];
const token = "123456";
const noErrors = {
  msg: {},
  status: null,
};

describe("This test will", () => {
  let store, wrapper;

  beforeEach(() => {
    store = mockStore({
      startup: { startups },
      auth: { token },
      errors: noErrors,
    });
    wrapper = mount(
      <Provider store={store}>
        <StartupForm getStartups={getStartups} addFinancial={addFinancial} />
      </Provider>
    );
    // Runs before each test in the suite
    store.clearActions();
  });

  it("redirect to startupPage if there are no errors in the state", () => {
    wrapper.find("#startupSubmitButton").simulate("click");
    expect(
      wrapper.contains(
        <Router>
          <Redirect to="/startupPage" />
        </Router>
      )
    ).toBe(true);
  });
});
