import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // Khi có <React.StrictMode>, React sẽ gọi lại component hai lần trong chế độ phát triển, nhưng chỉ
  // chạy một lần trong production.

  //   StrictMode là một công cụ trong React giúp phát hiện lỗi tiềm ẩn trong ứng dụng trong chế độ phát triển (development mode).
  // 🔹 Nó không ảnh hưởng đến production (khi build app).
  // 🔹 Nó giúp cải thiện chất lượng code bằng cách cảnh báo về những vấn đề liên quan đến:
  // ✅ Các phương thức đã lỗi thời (deprecated).
  // ✅ Các side-effects không mong muốn.
  // ✅ Phát hiện lỗi trong component lifecycle và useEffect.

  // 2️⃣ Strict Mode hoạt động như thế nào?
  // Component sẽ re-render hai lần trong development mode (chỉ chạy trong React 18).
  // 👉 Mục đích: Kiểm tra xem có side-effects không mong muốn không.
  // Cảnh báo khi dùng API lỗi thời.
  // 👉 Nếu bạn dùng lifecycle methods cũ như componentWillMount, componentWillReceiveProps, nó sẽ cảnh báo.
  // Phát hiện side-effect trong useEffect().
  // 👉 Nếu bạn quên cleanup useEffect, React sẽ báo lỗi.

  //   Side Effects trong React là gì?
  // Side effect (tác dụng phụ) trong lập trình là bất kỳ hoạt động nào làm thay đổi trạng thái bên ngoài hàm hiện tại.

  // 📌 Trong React, side effects thường xảy ra khi component tương tác với bên ngoài như:
  // ✅ Gọi API (fetch data từ server).
  // ✅ Thao tác với DOM (ví dụ: document.title, focus vào input).
  // ✅ Sử dụng setTimeout, setInterval.
  // ✅ Lưu dữ liệu vào localStorage, sessionStorage.

  <StrictMode>
    <App />
  </StrictMode>
);
