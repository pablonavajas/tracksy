import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addStartup, setCurrent } from "../../actions/startupsActions";
import CurrencyFormat from "react-currency-format";

const AddStartupModal = ({ addStartup, setCurrent }) => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [board, setBoard] = useState("");
  const [ownership, setOwnership] = useState("");
  const [startupEmail, setStartupEmail] = useState("");

  const onSubmit = () => {
    const newStartup = {
      name,
      website,
      ownership,
      startupEmail,
      board
    };

    addStartup(newStartup);

    // Clear fields
    setName("");
    setWebsite("");
    setOwnership("");
    setBoard("");
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
        {/** Startup Email */}
        <div className="row">
          <div className="input-field col s12">
            <input
              id="startupEmail_add"
              name="startupEmail"
              type="text"
              value={startupEmail}
              onChange={e => setStartupEmail(e.target.value)}
            />
            <label htmlFor="startupEmail_add">Startup Email</label>
          </div>
        </div>
        {/* Membership */}
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
        <div className="center">
          <a
            // href="#add-investments-modal" (add modal-trigger to className)
            onClick={onSubmit}
            className="btn waves-effect waves-light light-blue modal-close"
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

AddStartupModal.propTypes = {
  addStartup: PropTypes.func.isRequired
};

export default connect(null, {
  addStartup,
  setCurrent
})(AddStartupModal);
