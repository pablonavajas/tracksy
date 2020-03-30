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
        <div className="chip center">{startup.ownership}</div>
      </td>
      <td className="center">
        <div className="chip center">{startup.board}</div>
      </td>

      <td className="center">
        {startup.investments.map((investment, i) => (
          <div className="center" key={investment.id}>
            <div className="chip center">
              <p>
                {i + 1}
                {". "}
                <CurrencyFormat
                  value={investment.value}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={investment.currency}
                />
              </p>
            </div>
          </div>
        ))}
      </td>
      <td className="center">
        {startup.investments.map(investment => (
          <div className="center" key={investment.id}>
            <div className="chip center">{investment.investmentType}</div>
          </div>
        ))}
      </td>
      <td>
        {startup.investments.map(investment => (
          <div className="center" key={investment.id}>
            <div className="chip center">
              {moment(investment.date).format("DD/MM/YYYY")}
            </div>
          </div>
        ))}
      </td>
      <td>
        <a
          href="#add-investments-modal"
          onClick={() => setCurrent(startup)}
          className="secondary-content modal-trigger"
        >
          <i className="material-icons grey-text">attach_money</i>
        </a>
      </td>
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
