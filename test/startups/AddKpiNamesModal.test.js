import React from "react";
import { shallow, mount } from "enzyme";
import { AddKpiNamesModal } from "../../tracksy/frontend/src/components/startups/AddKpiNamesModal";
import ConnectedAddKpiNamesModal from "../../tracksy/frontend/src/components/startups/AddKpiNamesModal";

import toJson from "enzyme-to-json";

import "../setupTests";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
const mockStore = configureMockStore([thunk]);

//Snapshot Test
describe("AddKpiNamesModal ", () => {
  let wrapper;
  const deleteKpiName = jest.fn();
  const addKpiNames = jest.fn();
  const setCurrent = jest.fn();

  it("renders correctly with no investments", () => {
    wrapper = shallow(
      <AddKpiNamesModal
        addKpiNames={addKpiNames}
        deleteKpiName={deleteKpiName}
        setCurrent={setCurrent}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe("AddInvestmentModal ", () => {
  let wrapper;
  const deleteKpiName = jest.fn();
  const addKpiNames = jest.fn();
  const setCurrent = jest.fn();
  const current = {
    id: 0,
    kpinames: [{ name: "test1" }, { id: 1, name: "test2" }],
  };

  beforeEach(() => {
    wrapper = mount(
      <AddKpiNamesModal
        addKpiNames={addKpiNames}
        deleteKpiName={deleteKpiName}
        setCurrent={setCurrent}
        current={current}
      />
    );
  });

  it("when submit is clicked, addKpiNames is called and current is set to null", () => {
    wrapper.find("#submitKpiNamesButton").simulate("click");
    expect(addKpiNames).toHaveBeenCalledWith(0, current.kpinames);
    expect(setCurrent).toHaveBeenCalledWith(null);
  });

  it("when add kpi button is clicked, internal list is updated", () => {
    // this button, uses React Hook UseState, therefore no need to test,
    // included for the purposes of coverage
    wrapper.find("#addKpiNameButton").simulate("click");
  });

  it("when delete kpi button is clicked, deleteKpiName is called", () => {
    wrapper.find("#deleteKpiNameButton").at(1).simulate("click");
    expect(deleteKpiName).toHaveBeenCalled();
  });
});

// Testing MapStateToProps
describe("AddKpiNamesModal ", () => {
  const deleteKpiName = jest.fn();
  const addKpiNames = jest.fn();
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
    <ConnectedAddKpiNamesModal
      addKpiNames={addKpiNames}
      deleteKpiName={deleteKpiName}
      setCurrent={setCurrent}
      store={store}
    />
  );

  it("should show the current value imported from store", () => {
    expect(wrapper.props().children.props.current).toEqual(current);
  });
});
