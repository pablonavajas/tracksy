import AddStartupBtn from "../tracksy/frontend/src/components/layout/AddStartupBtn";
import React from "react";
import { configure, shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<AddStartupBtn />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddStartupBtn />);
  });

  it("should render one <a> button", () => {
    expect(wrapper.find("a")).toHaveLength(1);
  });

  it("should contain the addition icon", () => {
    expect(wrapper.contains(<i className="large material-icons">add</i>)).toBe(
      true
    );
  });
});
