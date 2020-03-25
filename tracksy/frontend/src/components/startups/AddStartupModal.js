import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addStartup } from "../../actions/startupsActions";
import CurrencyFormat from "react-currency-format";

// import M from 'materialize-css/dist/js/materialize.min.js';

const AddStartupModal = ({ addStartup }) => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [ownership, setOwnership] = useState("");
  const [currency, setCurrency] = useState("");
  const [board, setBoard] = useState("");
  const [investment_1, setInvestment_1] = useState("");
  const [type_1, setType_1] = useState("");
  const [date_closed_1, setDate_1] = useState("");
  const [investment_2, setInvestment_2] = useState("");
  const [type_2, setType_2] = useState("");
  const [date_closed_2, setDate_2] = useState("");

  const onSubmit = () => {
    const newStartup = {
      name,
      website,
      ownership,
      currency,
      board,
      investment_1,
      investment_2,
      type_1,
      type_2,
      date_closed_1,
      date_closed_2
    };

    addStartup(newStartup);

    // Clear fields
    setName("");
    setWebsite("");
    setOwnership("");
    setCurrency("");
    setBoard("");
    setInvestment_1("");
    setDate_1("");
    setType_1("");
    setInvestment_2("");
    setDate_2("");
    setType_2("");
  };

  return (
    <div id="add-startup-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter New Startup</h4>
        {/** Name */}
        <div className="row">
          <div className="input-field col s12">
            <input
              id="name_add"
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label htmlFor="name_add">Startup Name</label>
          </div>
        </div>

        {/** Website */}
        <div className="row">
          <div className="input-field col s12">
            <input
              id="website_add"
              type="text"
              name="website"
              value={website}
              onChange={e => setWebsite(e.target.value)}
            />
            <label htmlFor="website_add">Website</label>
          </div>
        </div>

        {/** Ownership */}
        <div className="row">
          <div className="input-field col s12">
            <input
              id="ownership_add"
              name="ownership"
              type="text"
              value={ownership}
              onChange={e => setOwnership(e.target.value)}
            />
            <label htmlFor="ownership_add">Ownership (%)</label>
          </div>
        </div>

        {/** Currency */}
        <div className="row">
          <div className="input-field col s12">
            <select
              id="currency_add"
              name="currency"
              value={currency}
              className="browser-default"
              onChange={e => setCurrency(e.target.value)}
            >
              <option value="" disabled>
                Choose your option
              </option>
              <option value="£">£</option>
              <option value="$">$</option>
              <option value="€">€</option>
            </select>
            <label htmlFor="currency_add" className="active">
              Currency
            </label>
          </div>
        </div>

        {/** Investment 1 */}
        <div className="row">
          <div className="input-field col s12">
            <CurrencyFormat
              id="investment_1_add"
              value={investment_1}
              thousandSeparator={true}
              prefix={currency}
              allowNegative={false}
              onValueChange={values => {
                const { formattedValue, value } = values;
                // formattedValue = $2,223
                // value ie, 2223
                setInvestment_1(value);
              }}
            />
            <label htmlFor="investment_1_add">Investment 1</label>
          </div>
        </div>

        {/** Type of Investment 1 */}
        <div className="row">
          <div className="input-field col s12">
            <input
              id="type_1_add"
              name="type_1"
              type="text"
              value={type_1}
              onChange={e => setType_1(e.target.value)}
            />
            <label htmlFor="type_1_add">Type of Investment 1</label>
          </div>
        </div>

        {/** Closing Date Investment 1 */}
        <div className="row">
          <div className="input-field col s12">
            <input
              id="date_1_add"
              name="date_1"
              value={date_closed_1}
              type="date"
              onChange={e => setDate_1(e.target.value)}
            />
            <label htmlFor="date_1_add">Close Date</label>
          </div>
        </div>

        {/** Investment 2 */}
        <div className="row">
          <div className="input-field col s12">
            <CurrencyFormat
              id="investment_2_add"
              value={investment_2}
              thousandSeparator={true}
              prefix={currency}
              allowNegative={false}
              onValueChange={values => {
                const { formattedValue, value } = values;
                // formattedValue = $2,223
                // value ie, 2223
                setInvestment_2(value);
              }}
            />
            <label htmlFor="investment_2_add">Investment 2</label>
          </div>
        </div>

        {/** Type of Investment 2 */}
        <div className="row">
          <div className="input-field col s12">
            <input
              id="type_2_add"
              name="type_2"
              type="text"
              value={type_2}
              onChange={e => setType_2(e.target.value)}
            />
            <label htmlFor="type_2_add">Type of Investment 2</label>
          </div>
        </div>

        {/** Closing Date Investment 2 */}
        <div className="row">
          <div className="input-field col s12">
            <input
              id="date_2"
              name="date_2"
              value={date_closed_2}
              type="date"
              onChange={e => setDate_2(e.target.value)}
            />
            <label htmlFor="date_2_add">Close</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <select
              name="board"
              value={board}
              className="browser-default"
              onChange={e => setBoard(e.target.value)}
            >
              <option value="" disabled>
                Select Board
              </option>
              <option value="Member">Member</option>
              <option value=" - "> - </option>
              <option value="Observer"> Observer </option>
            </select>
          </div>
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

AddStartupModal.propTypes = {
  addStartup: PropTypes.func.isRequired
};

export default connect(null, { addStartup })(AddStartupModal);
