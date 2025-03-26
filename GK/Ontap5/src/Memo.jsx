import React from "react";

function Memo({ value }) {
  console.log("🔁 Child render");
  return <div>Children value: {value}</div>;
}

export default React.memo(Memo);
