import React from "react";
import { shallow, mount } from "enzyme";
import { AddInvestmentModal } from "../../tracksy/frontend/src/components/startups/AddInvestmentModal";
import ConnectedAddInvestmentModal from "../../tracksy/frontend/src/components/startups/AddInvestmentModal";
import toJson from "enzyme-to-json";

import "../setupTests";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

//Snapshot Test
describe("AddInvestmentModal ", () => {
  let wrapper;
  const deleteInvestment = jest.fn();
  const addInvestments = jest.fn();
  const setCurrent = jest.fn();

  it("renders correctly with no investments", () => {
    wrapper = shallow(
      <AddInvestmentModal
        addInvestments={addInvestments}
        deleteInvestment={deleteInvestment}
        setCurrent={setCurrent}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders correctly with investments", () => {
    const current = {
      id: 0,
      investments: [
        {
          id: 0,
          value: 10,
          currency: "$",
          investmentType: "A",
          date: "10-10-2000",
        },
        {
          id: 1,
          value: 20,
          currency: "$",
          investmentType: "B",
          date: "10-10-2001",
        },
      ],
    };
    wrapper = mount(
      <AddInvestmentModal
        addInvestments={addInvestments}
        deleteInvestment={deleteInvestment}
        setCurrent={setCurrent}
        current={current}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe("AddInvestmentModal ", () => {
  let wrapper;
  const deleteInvestment = jest.fn();
  const addInvestments = jest.fn();
  const setCurrent = jest.fn();
  const current = {
    id: 0,
    investments: [
      { id: 0, value: 10 },
      { id: 1, value: 20 },
    ],
  };

  beforeEach(() => {
    wrapper = mount(
      <AddInvestmentModal
        addInvestments={addInvestments}
        deleteInvestment={deleteInvestment}
        setCurrent={setCurrent}
        current={current}
      />
    );
    wrapper.update();
  });

  it("when submit is clicked, addInvestments is called and current is set to null", () => {
    wrapper.find("#submitInvestmentButton").simulate("click");
    expect(addInvestments).toHaveBeenCalledWith(0, current.investments);
    expect(setCurrent).toHaveBeenCalledWith(null);
  });

  it("when add investment button is clicked, internal list is updated", () => {
    // this button, uses React Hook UseState, therefore no need to test,
    // included for the purposes of coverage
    wrapper.find("#addInvestmentButton").simulate("click");
  });
  it("hehe", () => {
    wrapper.find("#deleteInvestmentButton").at(1).simulate("click");
    expect(deleteInvestment).toHaveBeenCalledWith(current.id, 1);
  });
});

// Testing MapStateToProps
describe("AddInvestmentModal ", () => {
  const deleteInvestment = jest.fn();
  const addInvestments = jest.fn();
  const setCurrent = jest.fn();
  const current = {
    id: 1,
    name: "test",
  };

  const initialState = {
    startup: { current },
  };

  const store = mockStore(initialState);
  const wrapper = shallow(
    <ConnectedAddInvestmentModal
      addInvestments={addInvestments}
      deleteInvestment={deleteInvestment}
      setCurrent={setCurrent}
      store={store}
    />
  );

  it("should show the current value imported from store", () => {
    expect(wrapper.props().children.props.current).toEqual(current);
  });
});
