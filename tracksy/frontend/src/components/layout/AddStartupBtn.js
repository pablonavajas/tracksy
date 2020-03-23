import React from "react";

//Button that triggers AddStartupModal
const AddStartupBtn = () => {
  return (
    <div className="fixed-action-btn">
      <a
        href="#add-startup-modal"
        className="btn-floating  waves-effect waves-light btn-large red darken-1 modal-trigger"
      >
        <i className="large material-icons">add</i>
      </a>
    </div>
  );
};

export default AddStartupBtn;
