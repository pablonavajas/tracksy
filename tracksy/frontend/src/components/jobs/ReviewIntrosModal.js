import React from "react";

function ReviewIntrosModal() {
  return (
    <div id="review-intros-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Review Introductions</h4>
      </div>
    </div>
  );
}

const modalStyle = {
  width: "60%",
  height: "75%"
};

export default ReviewIntrosModal;
