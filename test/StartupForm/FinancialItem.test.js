import FinancialItem from "../../tracksy/frontend/src/components/startupForm/FinancialItem";
import { shallow } from "enzyme";
import React from "react";
import "../setupTests";

import CurrencyFormat from "react-currency-format";

const financial = {
  id: 1,
  kpis: [
    {
      id: 1,
      name: "SMTH",
      value: 0.1,
      financialId: 1,
    },
    {
      id: 2,
      name: "smth",
      value: 0.5,
      financialId: 1,
    },
  ],
  comment: "First Report",
  currency: "$",
  revenue: 10.0,
  cashBalance: 100.0,
  monthlyBurn: 1000.0,
  startDate: "2005-04-04",
  endDate: "2005-05-05",
  startupId: 2,
};

describe("FinancialItem ", () => {
  const wrapper = shallow(<FinancialItem financial={financial} />);

  it("should have three currency formatted fields", () => {
    expect(wrapper.find(CurrencyFormat)).toHaveLength(3);
  });

  it("should have seven chips divs", () => {
    expect(wrapper.find(".chip.center")).toHaveLength(7);
  });
});
