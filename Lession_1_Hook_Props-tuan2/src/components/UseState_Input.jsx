import { useState } from "react";

export default function Format_Input() {
  const [value, setValue] = useState("");

  const handlerChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <div className="container">
        <input type="text" onChange={handlerChange} />
        <input type="text" defaultValue={value} readOnly />
      </div>
    </div>
  );
}
