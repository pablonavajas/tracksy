import React from "react";

function StartupFormField({ field }) {
  return (
    <div class="input-field col s12">
      <input id="last_name" type="text" className="validate" />
      <label for="last_name" className="active">
        {field}
      </label>
    </div>
  );
}

export default StartupFormField;
