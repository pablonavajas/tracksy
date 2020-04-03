import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addKpiNames, deleteKpiName } from "../../actions/kpiActions";
import CurrencyFormat from "react-currency-format";
import { setCurrent, getStartups } from "../../actions/startupsActions";

const addKpiNamesModal = ({
  current,
  addKpiNames,
  deleteKpiName,
  setCurrent
}) => {
  const [currentName, setCurrentName] = useState("");
  const [defaultKpis, setDefaultKPIs] = useState([
    {
      name: "Revenue"
    },
    {
      name: "Cash Balance"
    },
    {
      name: "Monthly Burn"
    }
  ]);

  let kpiNo = 0;
  const incrementKpiNo = () => {
    kpiNo += 1;
  };
  const decrementKpiNo = () => {
    kpiNo -= 1;
  };

  const [list, setList] = useState([{ name: "" }]);

  useEffect(() => {
    if (current) {
      console.log("USe effect called and current is true");
      setCurrentName(current.name);
      setList(current.kpinames);
      console.log(current);
    }
  }, [current]);

  const addInput = () => {
    incrementKpiNo();
    setList([...list, { name: "" }]);
  };

  // 0-based index
  const deleteInput = index => {
    // delete the inputs from database if they were already there
    if (list[index].id) {
      deleteKpiName(current.id, list[index].id);
    }

    //delete the inputs from the modal
    decrementKpiNo();
    list.splice(index, 1);
    setList([...list]);
  };

  const onSubmitHelper = callback => {
    list.map(kpiName => {
      if (kpiName.id) console.log(kpiName.id);
      if (kpiName.name) addKpiNames(current.id, kpiName);
      // console.log("in map");
    });
    callback();
  };

  const onSubmit = () => {
    addKpiNames(current.id, list);
    setCurrent(null);
  };

  console.log("KPIIIIISISISIS");
  console.log(list);
  console.log(defaultKpis);

  return (
    <div id="add-kpi-names-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter KPI Names for {currentName}</h4>
        <div className="center">
          <div className="row">
            {defaultKpis.map(kpi => {
              incrementKpiNo();
              return (
                <div className="input-field col s4" key={kpiNo}>
                  <input
                    disabled
                    value={kpi.name}
                    id={kpiNo}
                    type="text"
                    className="validate"
                  />
                  <label htmlFor={kpiNo}>Kpi Name {kpiNo} (default)</label>
                </div>
              );
            })}
            {list.map((kpi, i) => (
              <div key={i}>
                <div className="input-field col s4">
                  <input
                    placeholder=""
                    id={"kpiName" + i}
                    name="type_1"
                    type="text"
                    value={kpi.name}
                    onChange={e => {
                      list[i].name = e.target.value;
                      setList([...list]);
                    }}
                  />
                  <label htmlFor={"kpiName" + i} className="active">
                    KPI Name {kpiNo + 1 + i}
                  </label>
                  <a href="#" onClick={() => deleteInput(i)}>
                    <i className=" material-icons grey-text postfix">
                      delete_forever
                    </i>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <a
            className="btn waves-effect waves-light light-blue"
            onClick={addInput}
          >
            Add KPI Name
          </a>
        </div>
      </div>
      <div className="modal-footer">
        <div className="center">
          <a
            onClick={onSubmit}
            className="modal-close waves-effect light-blue waves-light btn"
          >
            Submit
          </a>
        </div>
      </div>
    </div>
  );
};

const modalStyle = {
  width: "60%",
  height: "75%"
};

addKpiNamesModal.propTypes = {
  addKpiNames: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    current: state.startup.current
  };
};

export default connect(mapStateToProps, {
  addKpiNames,
  deleteKpiName,
  setCurrent
})(addKpiNamesModal);
