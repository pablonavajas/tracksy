import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateStartup } from '../../actions/startupsActions';

import M from 'materialize-css/dist/js/materialize.min.js';

const EditStartupModal = ({ current, updateStartup }) => {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [ownership, setOwnership] = useState('');
  const [board, setBoard] = useState('');
  const [investment_1, setInvestment_1] = useState('');
  const [type_1, setType_1] = useState('');
  const [date_1, setDate_1] = useState('');
  const [investment_2, setInvestment_2] = useState('');
  const [type_2, setType_2] = useState('');
  const [date_2, setDate_2] = useState('');

  useEffect(() => {
    if (current) {
      setName(current.name);
      setWebsite(current.website);
      setOwnership(current.ownership);
      setBoard(current.board);
      setInvestment_1(current.investment_1);
      setDate_1(current.date_1);
      setType_1(current.type_1);
      setInvestment_2(current.investment_2);
      setDate_2(current.date_2);
      setType_2(current.type_2);
    }
    //dependency of useEffect is current
  }, [current]);

  const onSubmit = () => {
    if (
      name === '' ||
      website === '' ||
      ownership === '' ||
      board === '' ||
      investment_1 === '' ||
      type_1 === '' ||
      date_1 === '' ||
      investment_2 === '' ||
      type_2 === '' ||
      date_2 === ''
    ) {
      M.toast({
        html: 'Please enter NA in the fields that are not applicable'
      });
    } else {
      const updStartup = {
        id: current.id,
        name,
        website,
        ownership,
        board,
        investment_1,
        investment_2,
        type_1,
        type_2,
        date_1,
        date_2
      };

      updateStartup(updStartup);
      M.toast({ html: `Startup updated` });

      // Clear fields
      setName('');
      setWebsite('');
      setOwnership('');
      setBoard('');
      setInvestment_1('');
      setDate_1('');
      setType_1('');
      setInvestment_2('');
      setDate_2('');
      setType_2('');
    }
  };

  return (
    <div id="edit-startup-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit Startup</h4>
        {/** Name */}
        <div className="row">
          <div className="input-field">
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <span className="helper-text">Startup Name</span>
          </div>
        </div>

        {/** Website */}
        <div className="row">
          <div className="input-field">
            <input
              id="website"
              type="text"
              name="website"
              value={website}
              onChange={e => setWebsite(e.target.value)}
            />
            <span className="helper-text">Website</span>
          </div>
        </div>

        {/** Ownership */}
        <div className="row">
          <div className="input-field">
            <input
              id="ownership"
              name="ownership"
              type="text"
              value={ownership}
              onChange={e => setOwnership(e.target.value)}
            />
            <span className="helper-text">Ownership (%)</span>
          </div>
        </div>

        {/** Investment 1 */}
        <div className="row">
          <div className="input-field">
            <input
              id="investment_1"
              name="investment_1"
              type="text"
              value={investment_1}
              onChange={e => setInvestment_1(e.target.value)}
            />
            <span className="helper-text">Investment 1</span>
          </div>
        </div>
        {/** Type of Investment 1 */}
        <div className="row">
          <div className="input-field">
            <input
              id="type_1"
              name="type_1"
              type="text"
              value={type_1}
              onChange={e => setType_1(e.target.value)}
            />
            <span className="helper-text">Type of investment 1</span>
          </div>
        </div>
        {/** Closing Date Investment 1 */}
        <div className="row">
          <div className="input-field">
            <input
              id="date_1"
              name="date_1"
              value={date_1}
              type="date"
              onChange={e => setDate_1(e.target.value)}
            />
            <span className="helper-text">Close Date</span>
          </div>
        </div>

        {/** Investment 2 */}
        <div className="row">
          <div className="input-field">
            <input
              id="investment_2"
              name="investment_2"
              type="text"
              value={investment_2}
              onChange={e => setInvestment_2(e.target.value)}
            />
            <span className="helper-text">Investment 2</span>
          </div>
        </div>

        {/** Type of Investment 2 */}
        <div className="row">
          <div className="input-field">
            <input
              id="type_2"
              name="type_2"
              type="text"
              value={type_2}
              onChange={e => setType_2(e.target.value)}
            />
            <span className="helper-text">Type of investment 2</span>
          </div>
        </div>

        {/** Closing Date Investment 2 */}
        <div className="row">
          <div className="input-field">
            <input
              id="date_2"
              name="date_2"
              value={date_2}
              type="date"
              onChange={e => setDate_2(e.target.value)}
            />
            <span className="helper-text">Close Date</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <select
            id="board"
            name="board"
            value={board}
            className="browser-default"
            onChange={e => setBoard(e.target.value)}
          >
            <option value="" disabled>
              Select Board
            </option>
            <option value="Member">Member</option>
            <option value=" - "> - </option>
            <option value="Observer"> Observer </option>
          </select>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect blue waves-light btn"
        >
          Submit
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '60%',
  height: '75%'
};

EditStartupModal.propTypes = {
  current: PropTypes.object,
  updateStartup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.startup.current
});

export default connect(mapStateToProps, { updateStartup })(EditStartupModal);
