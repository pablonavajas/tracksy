import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addStartup } from "../../actions/startupsActions";
import { SelectField, InputField } from "../smallComponents/inputFields";

const AddStartupModal = ({ addStartup }) => {
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
      board,
    };

    addStartup(newStartup);

    // Clear fields
    setName("");
    setWebsite("");
    setOwnership("");
    setStartupEmail("");
    setBoard("");
  };

  return (
    <div id="add-startup-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter New Startup</h4>
        {/** Name */}
        <div className="row">
          <InputField
            id="addStartupName"
            name="Startup Name"
            type="text"
            value={name}
            setFunction={setName}
          />
        </div>
        {/** Website */}
        <div className="row">
          <InputField
            id="addWebsiteUrl"
            name="Website URL"
            type="text"
            value={website}
            setFunction={setWebsite}
          />
        </div>
        {/** Ownership */}
        <div className="row">
          <InputField
            id="addOwnership"
            name="Ownership (%)"
            type="number"
            value={ownership}
            setFunction={setOwnership}
          />
        </div>
        {/** Startup Email */}
        <div className="row">
          <InputField
            id="addStartupEmail"
            name="Startup Email"
            type="email"
            value={startupEmail}
            setFunction={setStartupEmail}
          />
        </div>
        {/* Membership */}
        <div className="row">
          <SelectField
            id="board"
            name="Board"
            value={board}
            setFunction={setBoard}
            options={[" - ", "Member", "Observer"]}
          />
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
  height: "75%",
};

AddStartupModal.propTypes = {
  addStartup: PropTypes.func.isRequired,
};

export default connect(null, {
  addStartup,
})(AddStartupModal);
