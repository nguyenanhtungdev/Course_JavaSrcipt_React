import React from "react";
import { useReducer } from "react";

// const initialState = { count: 0 };

export default function TinhToan() {
  const [state, dispatch] = useReducer(reducer, 0);

  function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return state + 1;
      case "decrement":
        return state - 1;
      case "reset":
        return 0;
      default:
        throw new Error("Unknown action type");
    }
  }

  return (
    <div>
      <h3>Count: {state}</h3>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
    </div>
  );
}
