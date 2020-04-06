import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../tracksy/frontend/src/components/App";
import Footer from "../tracksy/frontend/src/components/layout/Footer";

configure({ adapter: new Adapter() });

it("Main application compnent renders without crashing", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Footer)).toHaveLength(1);
});
