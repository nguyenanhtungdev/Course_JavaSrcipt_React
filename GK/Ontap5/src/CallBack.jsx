import React, { useState, useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("🔁 Child render");
  return <button onClick={onClick}>Click me</button>;
});

export default function App() {
  const [count, setCount] = useState(0);

  // Thử đổi 2 dòng này để thấy sự khác biệt 👇

  // ❌ Tạo function mới mỗi lần App render
  //   const handleClick = () => console.log("Clicked");

  // ✅ Giữ nguyên function bằng useCallback
  const handleClick = useCallback(() => console.log("Clicked"), []);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Tăng Count</button>

      <Child onClick={handleClick} />
    </div>
  );
}
