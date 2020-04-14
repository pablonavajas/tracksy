import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateStartup } from "../../actions/startupsActions";

import { SelectField, InputField } from "../smallComponents/inputFields";

const EditStartupModal = ({ current, updateStartup }) => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [ownership, setOwnership] = useState("");
  const [startupEmail, setStartupEmail] = useState("");
  const [board, setBoard] = useState("");

  useEffect(() => {
    if (current) {
      setName(current.name);
      setWebsite(current.website);
      setOwnership(current.ownership);

      setBoard(current.board);
      setStartupEmail(current.startupEmail);
    }
  }, [current]);

  const onSubmit = () => {
    const updStartup = {
      id: current.id,
      name,
      website,
      ownership,
      board,
      startupEmail,
    };
    updateStartup(updStartup);
  };

  return (
    <div id="edit-startup-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit Startup</h4>
        {/** Name */}
        <div className="row">
          <InputField
            placeholder=""
            id="editStartupName"
            name="Startup Name"
            type="text"
            value={name ? name : ""}
            setFunction={setName}
          />
        </div>
        {/** Website */}
        <div className="row">
          <InputField
            placeholder=""
            id="editWebsiteUrl"
            name="Website URL"
            type="text"
            value={website ? website : ""}
            setFunction={setWebsite}
          />
        </div>
        {/** Ownership */}
        <div className="row">
          <InputField
            placeholder=""
            id="editOwnership"
            name="Ownership (%)"
            type="number"
            value={ownership ? ownership : ""}
            setFunction={setOwnership}
          />
        </div>
        {/** Startup Email */}
        <div className="row">
          <InputField
            placeholder=""
            id="editStartupEmail"
            name="Startup Email"
            type="email"
            value={startupEmail ? startupEmail : ""}
            setFunction={setStartupEmail}
          />
        </div>
        {/* Membership */}
        <div className="row">
          <SelectField
            id="editBoard"
            name="Board"
            value={board ? board : ""}
            setFunction={setBoard}
            options={[" - ", "Member", "Observer"]}
          />
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
  height: "75%",
};

EditStartupModal.propTypes = {
  current: PropTypes.object,
  updateStartup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.startup.current,
});

export default connect(mapStateToProps, { updateStartup })(EditStartupModal);
