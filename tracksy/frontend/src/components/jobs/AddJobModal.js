import React from "react";

function AddJobModal() {
  return (
    <div id="add-job-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Add Job</h4>
      </div>
    </div>
  );
}

const modalStyle = {
  width: "60%",
  height: "75%"
};

export default AddJobModal;
