import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addStartup } from "../../actions/startupsActions";

// import M from 'materialize-css/dist/js/materialize.min.js';

const AddStartupModal = ({ addStartup }) => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [ownership, setOwnership] = useState("");
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
      board,
      investment_1,
      investment_2,
      type_1,
      type_2,
      date_closed_1,
      date_closed_2
    };
    //console.log(date_closed_1);

    addStartup(newStartup);

    // Clear fields
    setName("");
    setWebsite("");
    setOwnership("");
    setBoard("");
    setInvestment_1("");
    setDate_1("");
    setType_1("");
    setInvestment_2("");
    setDate_2("");
    setType_2("");

    //console.log('Submit button Clicked');
  };

  return (
    <div id="add-startup-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter New Startup</h4>
        {/** Name */}
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label>Startup Name</label>
          </div>
        </div>

        {/** Website */}
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="name"
              value={website}
              onChange={e => setWebsite(e.target.value)}
            />
            <label>Website</label>
          </div>
        </div>

        {/** Ownership */}
        <div className="row">
          <div className="input-field">
            <input
              name="ownership"
              type="text"
              value={ownership}
              onChange={e => setOwnership(e.target.value)}
            />
            <label>Ownership (%)</label>
          </div>
        </div>

        {/** Investment 1 */}
        <div className="row">
          <div className="input-field">
            <input
              name="investment_1"
              type="text"
              required
              value={investment_1}
              onChange={e => setInvestment_1(e.target.value)}
            />
            <label>Investment 1</label>
          </div>
        </div>
        {/** Type of Investment 1 */}
        <div className="row">
          <div className="input-field">
            <input
              name="type_1"
              type="text"
              value={type_1}
              onChange={e => setType_1(e.target.value)}
            />
            <label>Type of Investment 1</label>
          </div>
        </div>
        {/** Closing Date Investment 1 */}
        <div className="row">
          <div className="input-field">
            <input
              name="date_1"
              value={date_closed_1}
              type="date"
              onChange={e => setDate_1(e.target.value)}
            />
            <label>Close Date</label>
          </div>
        </div>

        {/** Investment 2 */}
        <div className="row">
          <div className="input-field">
            <input
              name="investment_2"
              type="text"
              required
              value={investment_2}
              onChange={e => setInvestment_2(e.target.value)}
            />
            <label>Investment 2</label>
          </div>
        </div>

        {/** Type of Investment 2 */}
        <div className="row">
          <div className="input-field">
            <input
              name="type_2"
              type="text"
              value={type_2}
              onChange={e => setType_2(e.target.value)}
            />
            <label>Type of Investment 2</label>
          </div>
        </div>

        {/** Closing Date Investment 2 */}
        <div className="row">
          <div className="input-field">
            <input
              name="date_2"
              value={date_closed_2}
              type="date"
              onChange={e => setDate_2(e.target.value)}
            />
            <label>Close</label>
          </div>
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
      <div className="modal-footer">
        <a
          href="#!"
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
