import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  // static propTypes = {
  //   error: PropTypes.object.isRequired,
  //   message: PropTypes.object.isRequired
  // };

  componentDidMount() {
    console.log("hahaha");
    this.props.alert.show("It works");
  }

  // componentDidUpdate(prevProps) {
  //   //if props have changed
  //   const { error, alert, message } = this.props;
  //   if (error !== prevProps.error) {
  //     if (error.msg.name) {
  //       alert.error(`Name: ${error.msg.name.join()}`);
  //     } else if (error.msg.email) {
  //       alert.error(`Email: ${error.msg.email.join()}`);
  //     } else if (error.msg.message) {
  //       alert.error(`Message: ${error.msg.message.join()}`);
  //     } else {
  //     }
  //   }
  //   if (message !== prevProps.message) {
  //     if (message.deleteLead) {
  //       alert.success(message.deleteLead);
  //     }
  //     if (message.addLead) {
  //       alert.success(message.addLead);
  //     }
  //   }
  // }

  render() {
    return <Fragment />;
  }
}

// const mapStateToProps = state => ({
//   error: state.errors,
//   message: state.messages
// });

export default withAlert()(Alerts);
// export default connect(mapStateToProps)(withAlert()(Alerts));
