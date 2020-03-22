import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  // prevProps (how does this get pulled in)
  componentDidUpdate(prevProps) {
    //if props have changed
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) {
        alert.error(`Name: ${error.msg.name.join()}`);
      } else if (error.msg.ownership) {
        alert.error(`Ownership: ${error.msg.ownership.join()}`);
      } else if (error.msg.investment_1) {
        alert.error(`Investment 1: ${error.msg.investment_1.join()}`);
      } else if (error.msg.investment_2) {
        alert.error(`Investment 2: ${error.msg.investment_2.join()}`);
      } else if (error.msg.date_closed_1) {
        alert.error(`Date Closed 1: ${error.msg.date_closed_1.join()}`);
      } else if (error.msg.date_closed_2) {
        alert.error(`Date Closed 2: ${error.msg.date_closed_2.join()}`);
      } else {
      }
    }

    if (message !== prevProps.message) {
      if (message.startupAdded) {
        alert.success(message.startupAdded);
      }
      if (message.startupDeleted) {
        alert.success(message.startupDeleted);
      }
      if (message.startupUpdated) {
        alert.success(message.startupUpdated);
      }
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
