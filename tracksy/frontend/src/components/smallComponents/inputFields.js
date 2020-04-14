import React from "react";
import CurrencyFormat from "react-currency-format";

export const InputField = ({
  id,
  name,
  type,
  value,
  setFunction,
  placeholder = undefined,
}) => {
  return (
    <div className="input-field col s12">
      <input
        placeholder={placeholder}
        id={id}
        type={type}
        value={value}
        onChange={(e) => setFunction(e.target.value)}
      />
      <label className="active" htmlFor={id}>
        {name}
      </label>
    </div>
  );
};

// Comments Input Field
export const CommentsField = ({ id, name, trueValue, setFunction }) => (
  <form className="col s12">
    <div className="row">
      <div className="input-field col s12">
        <textarea
          id={id}
          className="materialize-textarea"
          value={trueValue}
          onChange={(e) => setFunction(e.target.value)}
        />
        <label htmlFor={id}>{name}</label>
      </div>
    </div>
  </form>
);

export const CurrencyFormattedField = ({
  id,
  name,
  trueValue,
  currency,
  setFunction,
}) => (
  <div className="input-field col s12">
    <CurrencyFormat
      id={id}
      value={trueValue}
      thousandSeparator={true}
      prefix={currency}
      allowNegative={false}
      onValueChange={(values) => {
        const { value } = values; // destructuring to get the pure integer value
        setFunction(value);
      }}
    />
    <label htmlFor={id}>{name}</label>
  </div>
);

export const SelectField = ({ id, name, value, setFunction, options }) => (
  <div className="input-field col s12">
    <select
      id={id}
      // name={name}
      value={value}
      className="browser-default"
      onChange={(e) => setFunction(e.target.value)}
    >
      <option value=" " disabled>
        Choose your option
      </option>
      {options.map((op, i) => (
        <option value={op} key={i}>
          {op}
        </option>
      ))}
    </select>
    <label htmlFor={id} className="active">
      {name}
    </label>
  </div>
);
