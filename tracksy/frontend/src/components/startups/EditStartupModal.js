import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateStartup } from "../../actions/startupsActions";
//import moment from "moment/src/moment";
//var moment = require("moment");
import CurrencyFormat from "react-currency-format";
// import M from "materialize-css";

const EditStartupModal = ({ current, updateStartup }) => {
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

  useEffect(() => {
    if (current) {
      setName(current.name);
      setWebsite(current.website);
      setOwnership(current.ownership);
      setCurrency(current.currency);
      setBoard(current.board);
      setInvestment_1(current.investment_1);
      setDate_1(current.date_closed_1);
      setType_1(current.type_1);
      setInvestment_2(current.investment_2);
      setDate_2(current.date_closed_2);
      setType_2(current.type_2);
    }
  }, [current]);

  const onSubmit = () => {
    const updStartup = {
      id: current.id,
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

    updateStartup(updStartup);

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
    <div id="edit-startup-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit Startup</h4>

        {/** Name */}
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder=""
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label className="active" for="name">
              Startup Name
            </label>
          </div>
        </div>

        {/** Website */}
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder=""
              id="website"
              type="text"
              name="website"
              value={website}
              onChange={e => setWebsite(e.target.value)}
            />
            <label className="active" for="website">
              Website
            </label>
          </div>
        </div>

        {/** Ownership */}
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder=""
              id="ownership"
              name="ownership"
              type="text"
              value={ownership ? ownership : ""}
              onChange={e => setOwnership(e.target.value)}
            />
            <label className="active" for="ownership">
              Ownership (%)
            </label>
          </div>
        </div>

        {/** Currency */}
        <div className="row">
          <div className="input-field col s12">
            <select
              id="currency"
              name="currency"
              value={currency}
              className="browser-default"
              onChange={e => setCurrency(e.target.value)}
            >
              <option value="" disabled selected>
                Choose your option
              </option>
              <option value="£">£</option>
              <option value="$">$</option>
              <option value="€">€</option>
            </select>
            <label className="active">Currency</label>
          </div>
        </div>

        {/** Investment 1 */}
        <div className="row">
          <div className="input-field col s12">
            <CurrencyFormat
              placeholder=""
              id="investment_1"
              value={investment_1 ? investment_1 : ""}
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
            <label for=" investment_1" className="active">
              Investment 1
            </label>
          </div>
        </div>
        {/** Type of Investment 1 */}
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder=""
              id="type_1"
              name="type_1"
              type="text"
              value={type_1 ? type_1 : ""}
              onChange={e => setType_1(e.target.value)}
            />
            <label for="type_1" className="active">
              Type of investment 1
            </label>
          </div>
        </div>
        {/** Closing Date Investment 1 */}
        <div className="row">
          <div className="input-field col s12">
            <input
              id="date_1"
              name="date_1"
              value={date_closed_1 ? date_closed_1 : ""}
              type="date"
              onChange={e => setDate_1(e.target.value)}
            />
            <label for="date_1" className="active">
              Close Date
            </label>
          </div>
        </div>

        {/** Investment 2 */}
        <div className="row">
          <div className="input-field col s12">
            <CurrencyFormat
              placeholder=""
              id="investment_2"
              value={investment_2 ? investment_2 : ""}
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
            <label for="investment_2" className="active">
              Investment 2
            </label>
          </div>
        </div>

        {/** Type of Investment 2 */}
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder=""
              id="type_2"
              name="type_2"
              type="text"
              value={type_2 ? type_2 : ""}
              onChange={e => setType_2(e.target.value)}
            />
            <label for="type_2" className="active">
              Type of investment 2
            </label>
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
            <label for="date_2" className="active">
              Close Date
            </label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <select
              id="board"
              name="board"
              value={board ? board : ""}
              className="browser-default"
              onChange={e => setBoard(e.target.value)}
            >
              <option value=" " selected disabled>
                Choose your option
              </option>
              <option value="Member">Member</option>
              <option value=" - "> - </option>
              <option value="Observer"> Observer </option>
            </select>
            <label className="active">Board</label>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <a
          onClick={onSubmit}
          className="modal-close waves-effect blue waves-light btn"
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

EditStartupModal.propTypes = {
  current: PropTypes.object,
  updateStartup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.startup.current
});

export default connect(mapStateToProps, { updateStartup })(EditStartupModal);
