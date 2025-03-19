import { useRef, useState } from "react";

function WithUseRef() {
  const countRef = useRef(0); // Giá trị sẽ không làm component re-render
  const [renderCount, setRenderCount] = useState(0); // Để kiểm tra re-render

  console.log("Component đã re-render!");

  const increaseRef = () => {
    countRef.current += 1;
    console.log("Giá trị countRef:", countRef.current); // Kiểm tra giá trị
  };

  return (
    <div>
      <h2>Render Count: {renderCount}</h2>
      <button onClick={() => setRenderCount(renderCount + 1)}>Re-render</button>

      <h2>Ref Count: {countRef.current}</h2>
      <button onClick={increaseRef}>Tăng Ref</button>
      {/* 📌 Khi chạy:
    ✅ Click "Tăng Ref" → countRef.current tăng lên nhưng UI không re-render.
    ✅ Click "Re-render" → countRef.current vẫn giữ nguyên giá trị trước đó.
    ❌ Giá trị của useRef không tự động cập nhật trên UI (vì nó không kích hoạt re-render). */}
    </div>
  );
}

export default WithUseRef;
