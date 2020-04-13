import { configure, mount, shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import regeneratorRuntime from "regenerator-runtime";

import { Redirect, HashRouter as Router } from "react-router-dom";

import Adapter from "enzyme-adapter-react-16";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { getStartups } from "../../tracksy/frontend/src/actions/startupsActions";
import { addFinancial } from "../../tracksy/frontend/src/actions/financialActions";
import Preloader from "../../tracksy/frontend/src/components/layout/Preloader";
import StartupForm, {
  DateField,
  currencyFormatField,
  CommentsField,
} from "../../tracksy/frontend/src/components/startupForm/StartupForm";

configure({ adapter: new Adapter() });

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

describe("onChange for ", () => {
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

  it("for currency will set it to £ sign", () => {
    wrapper.find("#currency").simulate("change", { target: { value: "£" } });
    expect(wrapper.find("#currency").prop("value")).toEqual("£");
  });
});

describe("This test will", () => {
  let store, wrapper, mockFn;

  beforeEach(() => {
    mockFn = jest.fn();
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

  // Test specific functions
  // it("", () => {
  //   let small_wrapper = mount(
  //     dateField("startDate", "Reporting Period Start Date", mockFn)
  //   );
  // });
});
