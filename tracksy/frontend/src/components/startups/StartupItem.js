import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteStartup, setCurrent } from "../../actions/startupsActions";
import CurrencyFormat from "react-currency-format";
var moment = require("moment");

const StartupItem = ({ startup, setCurrent, deleteStartup }) => {
  return (
    <tr>
      <th className="center">
        <a href={"https://" + startup.website}>
          <img
            src={"http://logo.clearbit.com/" + startup.website}
            alt=""
            width="100"
            height="100"
          />
        </a>
        <div>{startup.name}</div>
      </th>
      <td className="center">
        <div>{startup.ownership}</div>
      </td>
      <td className="center">{startup.board}</td>
      <td>
        <CurrencyFormat
          value={startup.investment_1}
          displayType={"text"}
          thousandSeparator={true}
          prefix={startup.currency}
        />
      </td>
      <td className="center">{startup.type_1}</td>
      <td>{moment(startup.date_closed_1).format("DD/MM/YYYY")}</td>
      <td className="center">
        <CurrencyFormat
          value={startup.investment_2}
          displayType={"text"}
          thousandSeparator={true}
          prefix={startup.currency}
        />
      </td>
      <td className="center">{startup.type_2}</td>
      <td>{moment(startup.date_closed_2).format("DD/MM/YYYY")}</td>
      <td>
        <a
          href="#edit-startup-modal"
          onClick={() => setCurrent(startup)}
          className="secondary-content modal-trigger"
        >
          <i className="material-icons grey-text">edit</i>
        </a>
      </td>
      <td>
        <a
          href="#!"
          onClick={() => deleteStartup(startup.id)}
          className="secondary-content"
        >
          <i className="material-icons grey-text">delete</i>
        </a>
      </td>
    </tr>
  );
};

StartupItem.propTypes = {
  startup: PropTypes.object.isRequired,
  deleteStartup: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, { setCurrent, deleteStartup })(StartupItem);
