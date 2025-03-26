import React, { useState, useCallback, useMemo } from "react";

// Component con chỉ re-render nếu prop thay đổi
const ExpensiveChild = React.memo(({ onClick }) => {
  console.log("🔁 Child re-render");
  return <button onClick={onClick}>Click me</button>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // ⚠️ Nếu không dùng useCallback, mỗi lần App render, onClick sẽ bị tạo lại (child sẽ re-render)
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []); // Không phụ thuộc gì -> không bị recreate

  // useMemo: chỉ tính lại khi count thay đổi
  const double = useMemo(() => {
    console.log("🔄 Tính toán lại double");
    return count * 2;
  }, [count]);

  return (
    <div>
      <h2>Count: {count}</h2>
      <h3>Double: {double}</h3>
      <button onClick={() => setCount((c) => c + 1)}>Tăng Count</button>
      <button onClick={() => setOther((o) => o + 1)}>
        Tăng Other ({other})
      </button>

      <ExpensiveChild onClick={handleClick} />
    </div>
  );
}
