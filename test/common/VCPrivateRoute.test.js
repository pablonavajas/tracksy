import React from "react";
import { shallow, mount } from "enzyme";
import { VCPrivateRoute } from "../../tracksy/frontend/src/components/common/VCPrivateRoute";
import ConnectedVCPrivateRoute from "../../tracksy/frontend/src/components/common/VCPrivateRoute";
import toJson from "enzyme-to-json";
import "../setupTests";
import { HashRouter as Router } from "react-router-dom";

//store needed for testing mapStateToProps
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

//only VC Funds can register
describe("VCPrivateRoute", () => {
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
        <VCPrivateRoute auth={auth} />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("redirects to login, if isAuthenticated is false ", () => {
    auth.isAuthenticated = false;
    wrapper = mount(
      <Router>
        <VCPrivateRoute auth={auth} />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("redirects to /startupPage, if isAuthenticated is true, isStartup is true and isLoading is false", () => {
    auth.isStartup = true;
    wrapper = mount(
      <Router>
        <VCPrivateRoute auth={auth} />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

// Testing MapStateToProps
describe("VCPrivateRoute ", () => {
  let store, wrapper;

  beforeAll(() => {
    store = mockStore({ auth: { isAuthenticated: false } });
    wrapper = shallow(<ConnectedVCPrivateRoute store={store} />);
  });

  it("should show the isAuthenticated value when imported from store", () => {
    expect(wrapper.props().children.props.auth.isAuthenticated).toBe(false);
  });
});
