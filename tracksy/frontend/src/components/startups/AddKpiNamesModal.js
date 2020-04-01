import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addKpiName } from "../../actions/kpiActions";
import CurrencyFormat from "react-currency-format";
import { setCurrent } from "../../actions/startupsActions";

const addKpiNamesModal = ({ addKpiName, current }) => {
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

  const [list, setList] = useState([
    {
      startupId: null,
      name: ""
    }
  ]);

  useEffect(() => {
    if (current) {
      setCurrentName(current.name);
    }
  }, [current]);

  const addInput = () => {
    incrementKpiNo();
    list.push({
      startupId: current.id,
      name: ""
    });
    setList([...list]);
  };

  const onSubmit = () => {
    list.map(kpiName => {
      addKpiName(kpiName);
    });

    // Clear fields
    // setList([]);
    setList([
      {
        startupId: null,
        name: ""
      }
    ]);
  };

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
                      list[i].startupId = current.id;
                      list[i].name = e.target.value;
                      setList([...list]);
                    }}
                  />
                  <label htmlFor={"kpiName" + i} className="active">
                    KPI Name {kpiNo + 1 + i}
                  </label>
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
  addKpiName: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    current: state.startup.current
  };
};

export default connect(mapStateToProps, { addKpiName })(addKpiNamesModal);
