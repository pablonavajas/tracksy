import React, { Component } from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../tracksy/frontend/src/components/App";
import Footer from "../tracksy/frontend/src/components/layout/Footer";
import Navbar from "../tracksy/frontend/src/components/layout/Navbar";

configure({ adapter: new Adapter() });

describe("App comonent", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = shallow(<App />);
  });

  it("has a footer component", () => {
    expect(wrapper.find(Footer)).toHaveLength(1);
  });

  it("has a navbar component", () => {
    expect(wrapper.find(Navbar)).toHaveLength(1);
  });
});
