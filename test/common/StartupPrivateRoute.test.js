import React from "react";
import { shallow, mount } from "enzyme";
import { StartupPrivateRoute } from "../../tracksy/frontend/src/components/common/StartupPrivateRoute";
import ConnectedStartupPrivateRoute from "../../tracksy/frontend/src/components/common/StartupPrivateRoute";
import toJson from "enzyme-to-json";
import "../setupTests";
import { HashRouter as Router } from "react-router-dom";

//store needed for testing mapStateToProps
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

//only VC Funds can register
describe("StartupPrivateRoute", () => {
  let auth, wrapper;

  beforeEach(() => {
    auth = {
      isAuthenticated: true,
      isLoading: false,
      isStartup: false,
    };
  });

  it("shows preloader, if isLoading is true ", () => {
    auth.isLoading = true;
    wrapper = mount(
      <Router>
        <StartupPrivateRoute auth={auth} />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("redirects to login, if isAuthenticated is false ", () => {
    auth.isAuthenticated = false;
    wrapper = mount(
      <Router>
        <StartupPrivateRoute auth={auth} />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("redirects to home page, if isAuthenticated is true, isStartup is false and isLoading is false", () => {
    wrapper = mount(
      <Router>
        <StartupPrivateRoute auth={auth} />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

// Testing MapStateToProps
describe("StartupPrivateRoute ", () => {
  let store, wrapper;

  beforeAll(() => {
    store = mockStore({ auth: { isAuthenticated: false } });
    wrapper = shallow(<ConnectedStartupPrivateRoute store={store} />);
  });

  it("should show the isAuthenticated value when imported from store", () => {
    expect(wrapper.props().children.props.auth.isAuthenticated).toBe(false);
  });
});
