import React from "react";
import { Slide } from "react-materialize";
import Adapter from "enzyme-adapter-react-16";
import { configure, shallow } from "enzyme";

import Home from "../tracksy/frontend/src/components/home/Home";
configure({ adapter: new Adapter() });

describe("<Home/> compnent", () => {
  it("should render a Slide component", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(Slide)).toHaveLength(4);
  });
});
