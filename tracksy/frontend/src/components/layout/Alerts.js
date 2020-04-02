import React, { Fragment, useEffect } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function Alerts({ error, message, alert }) {
  useEffect(() => {
    if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
    else if (error.msg.ownership)
      alert.error(`Ownership: ${error.msg.ownership.join()}`);
    else if (error.msg.website)
      alert.error(`Website: ${error.msg.website.join()}`);
    else if (error.msg.startupEmail)
      alert.error(`Startup Email: ${error.msg.startupEmail.join()}`);
    else if (error.msg.revenue)
      alert.error(`Revenue: ${error.msg.revenue.join()}`);
    else if (error.msg.cashBalance)
      alert.error(`Cash Balance: ${error.msg.cashBalance.join()}`);
    else if (error.msg.monthlyBurn)
      alert.error(`Cash Balance: ${error.msg.monthlyBurn.join()}`);
    else if (error.msg.non_field_errors) {
      alert.error(error.msg.non_field_errors.join());
    } else if (error.msg.username) {
      alert.error(error.msg.username.join());
    }

    if (message.succ) alert.success(message.succ);
    if (message.fail) alert.error(message.fail);
  });

  return <Fragment />;
}

Alerts.propTypes = {
  error: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
