import React from "react";
import { shallow, mount } from "enzyme";
import Footer from "../../tracksy/frontend/src/components/layout/Footer";
import toJson from "enzyme-to-json";
import "../setupTests";

describe("Footer", () => {
  it("renders vcLinks, when isAuthenticated is true, and isStartup is false", () => {
    const wrapper = shallow(<Footer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
