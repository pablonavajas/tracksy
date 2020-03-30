import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addInvestment } from "../../actions/investmentsActions";
import CurrencyFormat from "react-currency-format";
import { setCurrent } from "../../actions/startupsActions";

const addInvestmentModal = ({ addInvestment, current }) => {
  const [currentName, setCurrentName] = useState("Hello");
  const [list, setList] = useState([
    {
      startupId: null,
      value: 0,
      currency: "£",
      investmentType: "",
      date: ""
    }
  ]);

  useEffect(() => {
    if (current) {
      setCurrentName(current.name);
      setList(current.investments);
    }
  }, [current]);

  const addInput = () => {
    list.push({
      startupId: current.id,
      value: "",
      currency: "£",
      investmentType: "",
      date: ""
    });
    setList([...list]);
  };

  const onSubmit = () => {
    list.map(inv => {
      addInvestment(inv);
    });

    // Clear fields
    // setList([]);
    setList([
      {
        startupId: null,
        value: 0,
        currency: "£",
        investmentType: "",
        date: ""
      }
    ]);
  };

  return (
    <div id="add-investments-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter Investments for {currentName}</h4>
        <div className="center">
          <div className="row">
            {list.map((inv, i) => (
              <div key={i}>
                <div className="input-field col s1">
                  <select
                    id={"invCurrency" + i}
                    name="currency"
                    value={inv.currency}
                    className="browser-default"
                    onChange={e => {
                      list[i].currency = e.target.value;
                      setList([...list]);
                    }}
                  >
                    <option value="£" defaultValue="£">
                      £
                    </option>
                    <option value="$">$</option>
                    <option value="€">€</option>
                  </select>
                  <label htmlFor={"invCurrency" + i} className="active">
                    Currency
                  </label>
                </div>
                <div className="input-field col s4" key={i}>
                  <CurrencyFormat
                    id={"invValue" + i}
                    value={inv.value}
                    thousandSeparator={true}
                    prefix={inv.currency}
                    allowNegative={false}
                    onValueChange={values => {
                      const { formattedValue, value } = values;
                      // formattedValue = $2,223
                      // value ie, 2223
                      list[i].startupId = current.id;
                      list[i].value = value;
                      setList([...list]);
                    }}
                  />
                  <label htmlFor={"inveValue" + i} className="active">
                    Investment
                  </label>
                </div>
                <div className="input-field col s4">
                  <input
                    placeholder=""
                    id={"invType" + i}
                    name="type_1"
                    type="text"
                    value={inv.investmentType}
                    onChange={e => {
                      list[i].investmentType = e.target.value;
                      setList([...list]);
                    }}
                  />
                  <label htmlFor={"invType" + i} className="active">
                    Type of Investment
                  </label>
                </div>
                <div className="input-field col s3">
                  <input
                    id={"invDate" + i}
                    name="date_1"
                    value={inv.date}
                    type="date"
                    onChange={e => {
                      list[i].date = e.target.value;
                      setList([...list]);
                    }}
                  />
                  <label htmlFor={"invDate" + i} className="active">
                    Close Date
                  </label>
                </div>
              </div>
            ))}
          </div>
          <a
            className="btn waves-effect waves-light light-blue"
            onClick={addInput}
          >
            Add Investment
          </a>
        </div>
      </div>
      <div className="modal-footer">
        <a
          onClick={onSubmit}
          className="modal-close waves-effect blue waves-light btn-flat"
        >
          Submit
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: "60%",
  height: "75%"
};

addInvestmentModal.propTypes = {
  addInvestment: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  // console.log(state.startup.current);
  return {
    current: state.startup.current
  };
};

export default connect(mapStateToProps, { addInvestment })(addInvestmentModal);
