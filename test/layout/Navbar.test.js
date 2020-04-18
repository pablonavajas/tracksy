import React from "react";
import { shallow, mount } from "enzyme";
import { Navbar } from "../../tracksy/frontend/src/components/layout/Navbar";
import ConnectedNavbar from "../../tracksy/frontend/src/components/layout/Navbar";
import toJson from "enzyme-to-json";
import "../setupTests";

//store needed for testing mapStateToProps
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

describe("Navbar", () => {
  let auth, wrapper, logout;

  beforeEach(() => {
    logout = jest.fn();
    auth = {
      isAuthenticated: true,
      username: "TestingModeUsername",
      isStartup: false,
    };
  });

  it("renders vcLinks, when isAuthenticated is true, and isStartup is false", () => {
    wrapper = shallow(<Navbar auth={auth} logout={logout} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders startupLinks, when isAuthenticated is true, and isStartup is true", () => {
    auth.isStartup = true;
    wrapper = shallow(<Navbar auth={auth} logout={logout} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders guestLinks, when isAuthenticated is false", () => {
    auth.isAuthenticated = false;
    wrapper = shallow(<Navbar auth={auth} logout={logout} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders empty string for username in vcLinks, when username is not provided", () => {
    auth.username = undefined;
    wrapper = shallow(<Navbar auth={auth} logout={logout} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

//Testing MapStateToProps
describe("Navbar ", () => {
  let store, wrapper, isAtuhenticated;

  beforeAll(() => {
    isAtuhenticated = false;
    store = mockStore({ auth: { isAtuhenticated } });
    wrapper = shallow(<ConnectedNavbar store={store} />);
  });

  it("should show the current value imported from store", () => {
    expect(wrapper.props().children.props.auth.isAtuhenticated).toEqual(
      isAtuhenticated
    );
  });
});
