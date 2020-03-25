import React from "react";
import StartupFormField from "./StartupFormField";

function StartupForm() {
  const fields = [
    {
      id: 1,
      name: "Last Name"
    },
    {
      id: 2,
      name: "First Name"
    }
  ];

  return (
    <div class="row">
      <form class="col s12">
        {fields.map(field => (
          <StartupFormField field={field.name} key={field.id} />
        ))}
      </form>
    </div>
  );
}

export default StartupForm;
