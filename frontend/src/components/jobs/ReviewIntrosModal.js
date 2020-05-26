import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { updateIntroductionsStatuses } from "../../actions/introductionActions";
import { setCurrentJob } from "../../actions/jobActions";
import Preloader from "../layout/Preloader";

export const ReviewIntrosModal = ({
  jobs: { current },
  updateIntroductionsStatuses,
  setCurrentJob,
}) => {
  const [introductions, setIntroductions] = useState(null);

  useEffect(() => {
    if (current) {
      setIntroductions(current.introductions);
    }
  }, [current]);

  const setStatus = (introductionId, status) => {
    introductions.map((introduction) => {
      introduction.id === introductionId ? (introduction.status = status) : {};
    });
    setIntroductions([...introductions]);
  };

  const onSubmit = () => {
    introductions.map((introduction) =>
      updateIntroductionsStatuses(current.startupId, current.id, introduction)
    );
    setCurrentJob(null);
  };

  return (
    <div id="review-intros-modal" className="modal" style={modalStyle}>
      {!current ? (
        <Preloader />
      ) : (
        <Fragment>
          <div className="modal-content">
            <h4>Review Introductions</h4>
            <div className="col s12">
              <table className="responsive-table highlight">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {current.introductions.map((introduction) => {
                    //if the connection for this introduciton exists
                    if (introduction.connection) {
                      return (
                        <tr key={introduction.id}>
                          <td>
                            <a href={introduction.connection.url}>
                              {introduction.connection.name}
                            </a>
                          </td>
                          <td>{introduction.connection.description}</td>
                          <td>
                            <select
                              id="rateIntroductionSelection"
                              className="browser-default"
                              onChange={(e) =>
                                setStatus(introduction.id, e.target.value)
                              }
                            >
                              <option value="" disabled>
                                Choose your option
                              </option>
                              <option value="Good">Good</option>
                              <option value="Excellent">Excellent</option>
                              <option value="Bad">Bad</option>
                            </select>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <div className="center">
              <a
                id="submitIntroductionsRatingButton"
                onClick={onSubmit}
                className="btn waves-effect waves-light light-blue modal-close"
              >
                Submit
              </a>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

ReviewIntrosModal.propTypes = {
  jobs: PropTypes.object.isRequired,
  updateIntroductionsStatuses: PropTypes.func.isRequired,
  setCurrentJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs,
});

const modalStyle = {
  width: "60%",
  height: "75%",
};

export default connect(mapStateToProps, {
  updateIntroductionsStatuses,
  setCurrentJob,
})(ReviewIntrosModal);
