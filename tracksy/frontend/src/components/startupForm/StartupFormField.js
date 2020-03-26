import React, { useState } from "react";

function StartupFormField({ field }) {
  const [field, setFieldValue] = useState(0);

  // useEffect(() => {
  //   if (current) {
  //     setName(current.name);
  //   }
  // }, []);

  return (
    <div className="input-field col s12">
      <input
        id={field.id}
        type="number"
        step="0.01"
        className="validate"
        onChange={e => {
          setFieldValue(e.target.value);
          console.log(fieldValue);
        }}
      />
      <label htmlFor={field.id} className="active">
        {field.name}
      </label>
    </div>
  );
}

export default StartupFormField;
