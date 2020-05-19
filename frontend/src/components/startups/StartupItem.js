import React from "react";
import PropTypes from "prop-types";
import CurrencyFormat from "react-currency-format";
var moment = require("moment");

import { connect } from "react-redux";
import { deleteStartup, setCurrent } from "../../actions/startupsActions";
import { ClickIcon } from "../smallComponents/displayComponents";
import { Chip } from "../smallComponents/displayComponents";

export const StartupItem = ({ startup, setCurrent, deleteStartup }) => {
  return (
    <tr>
      <th className="center">
        <a href={`https://${startup.website}`}>
          <img
            src={`http://logo.clearbit.com/${startup.website}`}
            alt=""
            width="100"
            height="100"
          />
        </a>
        <div>{startup.name}</div>
      </th>
      <td className="center">
        <Chip data={startup.ownership} />
      </td>
      <td className="center">
        <Chip data={startup.board} />
      </td>
      <td className="center">
        {startup.investments.map((investment) => (
          <div className="center" key={investment.id}>
            <Chip
              data={
                <CurrencyFormat
                  value={investment.value}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={investment.currency}
                />
              }
            />
          </div>
        ))}
      </td>
      <td className="center">
        {startup.investments.map((investment) => (
          <div className="center" key={investment.id}>
            <Chip data={investment.investmentType} />
          </div>
        ))}
      </td>
      <td>
        {startup.investments.map((investment) => (
          <div className="center" key={investment.id}>
            <Chip data={moment(investment.date).format("DD/MM/YYYY")} />
          </div>
        ))}
      </td>
      <td>
        <ClickIcon
          href="#startup-overview"
          setFunction={setCurrent}
          val={startup}
          iconName="dehaze"
        />
      </td>
      <td>
        <ClickIcon
          href="#edit-startup-modal"
          setFunction={setCurrent}
          val={startup}
          iconName="edit"
        />
      </td>
      <td>
        <ClickIcon
          href="#add-investments-modal"
          setFunction={setCurrent}
          val={startup}
          iconName="attach_money"
        />
      </td>
      {/* Display grey button with no functionality if some financials have already been added */}
      {startup.financials.length === 0 ? (
        <td>
          <ClickIcon
            href="#add-kpi-names-modal"
            setFunction={setCurrent}
            val={startup}
            iconName="insert_chart"
          />
        </td>
      ) : (
        <td>
          <a
            id="unclickableIcon"
            href="!#"
            className="secondary-content"
            onClick={(e) => e.preventDefault()}
          >
            <i className="material-icons grey-text">insert_chart</i>
          </a>
        </td>
      )}
      <td>
        <a
          id="deleteIcon"
          href="#!"
          onClick={(e) => {
            e.preventDefault();
            deleteStartup(startup.id);
          }}
          className="secondary-content"
        >
          <i className="material-icons blue-text">delete</i>
        </a>
      </td>
    </tr>
  );
};

StartupItem.propTypes = {
  startup: PropTypes.object.isRequired,
  deleteStartup: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

// Inject App Level state, so that
// component updates upon an update of info
// (e.g. added investment)
const mapStateToProps = (state) => ({
  startups: state.startup.startups,
});

export default connect(mapStateToProps, { setCurrent, deleteStartup })(
  StartupItem
);
