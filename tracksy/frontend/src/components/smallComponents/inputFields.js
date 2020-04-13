import React from "react";
import CurrencyFormat from "react-currency-format";

export const DateField = ({ id, name, trueValue, setFunction }) => {
  return (
    <div className="input-field col s12">
      <input
        id={id}
        type="date"
        value={trueValue}
        onChange={(e) => setFunction(e.target.value)}
      />
      <label htmlFor={id}>{name}</label>
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
