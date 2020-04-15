import React from "react";
import { Provider } from "react-redux";

import { mount, shallow } from "enzyme";
import "../setupTests";
import toJson from "enzyme-to-json";
import { Startups } from "../../tracksy/frontend/src/components/startups/Startups";
import StartupItem from "../../tracksy/frontend/src/components/startups/StartupItem";
import ConnectedStartups from "../../tracksy/frontend/src/components/startups/Startups";
import Preloader from "../../tracksy/frontend/src/components/layout/Preloader";
import AddStartupBtn from "../../tracksy/frontend/src/components/layout/AddStartupBtn";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

//Snapshot Test
describe("Startups component ", () => {
  let wrapper;
  const startups = [
    { id: 0, name: "company1" },
    { id: 1, name: "company2" },
  ];

  const loading = false;
  const startup = { startups, loading };

  const mockFn = jest.fn();

  it("renders correctly", () => {
    wrapper = shallow(<Startups startup={startup} getStartups={mockFn} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders two StartupItem components as expected", () => {
    wrapper = shallow(
      <Startups startup={{ startups, loading }} getStartups={mockFn} />
    );
    expect(wrapper.find(StartupItem)).toHaveLength(2);
  });

  it("shows preloader when loading prop is true", () => {
    wrapper = shallow(
      <Startups startup={{ startups, loading: true }} getStartups={mockFn} />
    );
    expect(wrapper.contains(<Preloader />)).toBe(true);
  });

  it("shows preloader when startups prop is null", () => {
    wrapper = shallow(
      <Startups startup={{ startups: null, loading }} getStartups={mockFn} />
    );
    expect(wrapper.contains(<Preloader />)).toBe(true);
  });

  it("says no startups to show (and displays the add button), when starups prop lenght is 0", () => {
    wrapper = shallow(
      <Startups startup={{ startups: [], loading }} getStartups={mockFn} />
    );
    expect(
      wrapper.contains(<h5 className="left">No startups to show...</h5>)
    ).toBe(true);

    expect(wrapper.contains(<AddStartupBtn />)).toBe(true);
  });
});

describe("Startups component ", () => {
  const mockFn = jest.fn();
  const startups = [
    { id: 0, name: "company1", investments: [], financials: [] },
    { id: 1, name: "company2", investments: [], financials: [] },
  ];
  const loading = false;
  const startup = { startups, loading };
  const initialState = {
    startup,
  };

  const store = mockStore(initialState);
  let wrapper;

  it("correctly imports startup and loading from the store through mapStateToProps", () => {
    wrapper = shallow(<ConnectedStartups getStartups={mockFn} store={store} />);
    expect(wrapper.props().children.props.startup).toEqual(startup);
  });

  it("calls getStartup upon initialisation", () => {
    //mount instead of shallow, because shallow doesn't call React Hooks
    wrapper = mount(
      <Provider store={store}>
        <Startups getStartups={mockFn} startup={startup} />
      </Provider>
    );
    expect(mockFn).toHaveBeenCalled();
  });
});
