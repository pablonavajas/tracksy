import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateStartup } from "../../actions/startupsActions";

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
          <div className="input-field col s12">
            <input
              placeholder=""
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="active" htmlFor="name">
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
              onChange={(e) => setWebsite(e.target.value)}
            />
            <label className="active" htmlFor="website">
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
              onChange={(e) => setOwnership(e.target.value)}
            />
            <label className="active" htmlFor="ownership">
              Ownership (%)
            </label>
          </div>
        </div>

        {/** Startup Email */}
        <div className="row">
          <div className="input-field col s12">
            <input
              placeholder=""
              id="startupEmail"
              name="startupEmail"
              type="text"
              value={startupEmail}
              onChange={(e) => setStartupEmail(e.target.value)}
            />
            <label htmlFor="startupEmail">Startup Email</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <select
              id="board"
              name="board"
              value={board ? board : ""}
              className="browser-default"
              onChange={(e) => setBoard(e.target.value)}
            >
              <option value=" " disabled>
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
