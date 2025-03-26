import React, { useState } from "react";

export default function useCounter(initValue = 0) {
  const [count, setCount] = useState(initValue);
  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initValue);
  return [count, increase, decrease, reset];
}
