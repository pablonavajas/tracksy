import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  addInvestment,
  deleteInvestment
} from "../../actions/investmentsActions";
import CurrencyFormat from "react-currency-format";
import { setCurrent } from "../../actions/startupsActions";

const addInvestmentModal = ({ addInvestment, deleteInvestment, current }) => {
  const [currentName, setCurrentName] = useState("");
  const [list, setList] = useState([]);

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

  const onSubmitHelper = callback => {
    list.map(inv => {
      addInvestment(inv);
    });

    callback();
  };

  const onSubmit = () => {
    onSubmitHelper(() => {
      // Clear fields
      setList([
        {
          startupId: null,
          value: 0,
          currency: "£",
          investmentType: "",
          date: ""
        }
      ]);
    });
  };

  // 0-based index
  const deleteInput = index => {
    // delete the inputs from database if they were already there
    if (list[index].id) {
      deleteInvestment(current.id, list[index].id);
    }

    //delete the inputs from the modal
    list.splice(index, 1);
    setList([...list]);
  };

  return (
    <div id="add-investments-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Investments for {currentName}</h4>
        <div className="center">
          {list.map((inv, i) => (
            <div className="row" key={i}>
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
              <div className="input-field col s2">
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
                <a href="#" onClick={() => deleteInput(i)}>
                  <i className="material-icons grey-text prefix">
                    delete_forever
                  </i>
                </a>
              </div>
            </div>
          ))}

          <a
            className="btn waves-effect waves-light light-blue"
            onClick={addInput}
          >
            Add Investment
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

addInvestmentModal.propTypes = {
  addInvestment: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  // console.log(state.startup.current);
  return {
    current: state.startup.current
  };
};

export default connect(mapStateToProps, { addInvestment, deleteInvestment })(
  addInvestmentModal
);
