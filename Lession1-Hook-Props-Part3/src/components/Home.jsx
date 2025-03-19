import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext); // sử dụng useContext(Context)

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>Current Theme: {theme}</h1>
      <p>Sử dụng dụng useContext để quản lý state toàn cục trong react!</p>
      <p>
        Giúp chia sẻ truyền state qua nhiều component mà không cần dùng props
        qua từng cấp <br /> giúp quản lý state toàn cục một cách dễ dàng hơn
      </p>
      <p>VD: sử dụng để quản lý chủ đề dark/ligh theme</p>
      <p>Cách hoạt động:</p>
      <ul>
        <li>Tạo Context – Định nghĩa một context để chứa state.</li>
        <li>
          Cung cấp Context – Sử dụng Provider để bọc component cần chia sẻ state
        </li>
        <li>
          Sử dụng Context – Trong component con, dùng useContext để truy xuất dữ
          liệu từ context.
        </li>
      </ul>
      <p>
        Các thuộc tính của useContext: <br />
        1. Context.Provider: Cung cấp dữ liệu (state) cho các component con.
        <br />
        2. Context.Consumer: Nhận dữ liệu từ Provider (Lấy dữ liệu từ Context
        (không cần useContext)).
        <br />
        3. useContext(Context): Lấy dữ liệu từ Provider (Lấy dữ liệu từ Context){" "}
        <br />
        4. Context.displayName: đặt tên cho context, để sử dụng trong devtools
      </p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
    //Hoặc dùng, khi sử dụng consumer thì ko cần khai báo useContext, ít sử dụng phổ biến
    // <ThemeContext.Consumer>
    //   {({ theme, toggleTheme }) => (
    //     <div style={{ background: theme === "light" ? "#fff" : "#333", color: theme === "light" ? "#000" : "#fff" }}>
    //       <h1>Theme hiện tại: {theme}</h1>
    //       <button onClick={toggleTheme}>Đổi giao diện</button>
    //     </div>
    //   )}
    // </ThemeContext.Consumer>
  );
}

export default Home;
