import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteStartup, setCurrent } from '../../actions/startupsActions';

import M from 'materialize-css/dist/js/materialize.min.js';

const startupItem = ({ startup, setCurrent, deleteStartup }) => {
  const onDelete = () => {
    deleteStartup(startup.id);
    M.toast({ html: 'Startup Deleted' });
  };

  return (
    <tr>
      <th className="center">
        <a href={'https://' + startup.website}>
          <img
            src={'http://logo.clearbit.com/' + startup.website}
            alt=""
            width="100"
            height="100"
          />
        </a>
        <div>{startup.name}</div>
      </th>
      <td className="center">{startup.ownership}</td>
      <td className="center">{startup.board}</td>
      <td>{startup.investment_1}</td>
      <td className="center">{startup.type_1}</td>
      <td>{startup.date_1}</td>
      <td className="center">{startup.investment_2}</td>
      <td className="center">{startup.type_2}</td>
      <td>{startup.date_2}</td>
      <td>
        <a
          href="#edit-startup-modal"
          onClick={() => setCurrent(startup)}
          className="secondary-content modal-trigger"
        >
          <i className="material-icons grey-text">edit</i>
        </a>
      </td>
      <td width="50">
        <a href="#!" onClick={onDelete} className="secondary-content">
          <i className="material-icons grey-text">delete</i>
        </a>
      </td>
    </tr>
  );
};

startupItem.propTypes = {
  startup: PropTypes.object.isRequired,
  deleteStartup: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

export default connect(null, { setCurrent, deleteStartup })(startupItem);
