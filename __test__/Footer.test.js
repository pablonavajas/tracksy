import Footer from "../tracksy/frontend/src/components/layout/Footer";
import React from "react";
import { configure, shallow } from "enzyme";

import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<Footer />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  it("should render a <footer> component", () => {
    expect(wrapper.find("footer")).toHaveLength(1);
  });
});
