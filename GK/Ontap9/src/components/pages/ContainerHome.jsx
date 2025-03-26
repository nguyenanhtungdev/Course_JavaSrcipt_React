import React from "react";
import useCounter from "../../useCounter";

export default function Container() {
  const [count, increase, decrease, reset] = useCounter(4);
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increase}>Tang</button>
      <button onClick={decrease}>Giam</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
