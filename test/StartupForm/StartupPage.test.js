import { configure, mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";

import Adapter from "enzyme-adapter-react-16";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { getStartups } from "../../tracksy/frontend/src/actions/startupsActions";
import StartupPage from "../../tracksy/frontend/src/components/startupForm/StartupPage";
import FinancialItem from "../../tracksy/frontend/src/components/startupForm/FinancialItem";
import Preloader from "../../tracksy/frontend/src/components/layout/Preloader";

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);

const startups = [
  {
    id: 0,
    name: "company1",
    financials: [
      {
        id: 1,
        kpis: [],
        comment: "First Report",
        currency: "$",
        revenue: 10.0,
        startupId: 2,
      },
    ],
  },
];
const token = "123456";

describe("When Loading is false and the startup is loaded ", () => {
  let store, wrapper;

  beforeEach(() => {
    store = mockStore({ startup: { startups }, auth: { token } });
    wrapper = mount(
      <Provider store={store}>
        <StartupPage getStartups={getStartups} />
      </Provider>
    );
    // Runs before each test in the suite
    store.clearActions();
  });

  it("component StartupPage should show one financial item", () => {
    expect(wrapper.find(FinancialItem)).toHaveLength(1);
  });
});

describe("When loading is true", () => {
  let store, wrapper;

  beforeEach(() => {
    const loading = true;
    store = mockStore({ startup: { startups, loading }, auth: { token } });
    wrapper = mount(
      <Provider store={store}>
        <StartupPage getStartups={getStartups} />
      </Provider>
    );
    // Runs before each test in the suite
    store.clearActions();
  });

  it("component should show preloader", () => {
    expect(wrapper.find(Preloader)).toHaveLength(1);
  });
});

describe("When there are no financials yet", () => {
  let store, wrapper;

  beforeEach(() => {
    const startups = [{ id: 0, name: "Company1", financials: [] }];
    store = mockStore({ startup: { startups }, auth: { token } });
    wrapper = mount(
      <Provider store={store}>
        <StartupPage getStartups={getStartups} />
      </Provider>
    );
    // Runs before each test in the suite
    store.clearActions();
  });

  it("component should show an h4 tag saying there is no history", () => {
    expect(wrapper.contains(<h4>There is no history to show ...</h4>)).toBe(
      true
    );
  });
});
