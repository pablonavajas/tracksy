import React, { Fragment, useEffect } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function MessageAlerts({ message, alert }) {
  useEffect(() => {
    if (message.succ) {
      alert.success(message.succ);
    } else if (message.fail) alert.error(message.fail);
  });

  return <Fragment />;
}

MessageAlerts.propTypes = {
  message: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(MessageAlerts));
