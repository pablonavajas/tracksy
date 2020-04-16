import React from "react";

export const ClickIcon = ({ href, setFunction, val, iconName }) => {
  return (
    <a
      href={href}
      onClick={() => setFunction(val)}
      className="secondary-content modal-trigger"
    >
      <i className="material-icons blue-text">{iconName}</i>
    </a>
  );
};

export const Chip = ({ data }) => {
  return <div className="chip center">{data}</div>;
};
