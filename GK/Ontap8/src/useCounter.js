import { useState } from "react";

export default function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increase = () => setCount((prev) => prev + 1); //React sẽ gọi function này và truyền giá trị mới nhất của count vào prev
  const decrease = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialValue);

  return [count, increase, decrease, reset];
}
