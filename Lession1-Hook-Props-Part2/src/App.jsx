import { useState, useRef, useEffect } from "react";
import "./App.css";
import FormExample from "./FormExample";

function App() {
  const [count, setCount] = useState(0);
  const [count_1, setCount_1] = useState(0);
  const inputRef = useRef(0);
  const inputRef_1 = useRef(null);
  const inputRef_2 = useRef(null);
  const [seconds, setSeconds] = useState(0);
  const iintervalRef = useRef(null);

  useEffect(() => {
    document.title = `Ban da nhan ${count_1} lan`;
  }, [count_1]);
  useEffect(() => {
    inputRef_1.current.focus(); // Focus vào input khi component mount
  }, []);
  useEffect(() => {
    iintervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(iintervalRef.current);
  }, []);

  const handleFocus = () => {
    inputRef_2.current.focus(); // Focus vào ô input
    inputRef_2.current.value = ""; // Xóa nội dung ô input
  };

  return (
    <>
      <h1>Sử dụng các hook trong react</h1>
      <h3>Sử dụng useState với useRef</h3>
      <button
        onClick={() => {
          inputRef.current++;
          console.log("Giá trị inputRef.current:", inputRef.current); // Log ref
          setCount(inputRef.current);
        }}
      >
        Click vào đây!
      </button>
      <h1>{count}</h1>
      <p>Giá trị: {count_1}</p>
      <button onClick={() => setCount_1(count_1 + 1)}>Tăng</button>
      <div>
        <h2> Truy cập và điều khiển DOM mà không làm re-render</h2>
        <input ref={inputRef_2} type="text" placeholder="Nhập gì đó..." />
        <button onClick={handleFocus}>Focus vào ô nhập liệu</button>
      </div>
      <input ref={inputRef_1} type="text" placeholder="Nhập gì đóaaa..." />
      <h2>
        Lưu trữ setTimeout hoặc setInterval mà không bị reset khi re-render
      </h2>
      <div>
        <p>Thời gian: {seconds} giây</p>
        <button onClick={() => clearInterval(iintervalRef.current)}>
          Dừng
        </button>
      </div>
      <FormExample />
    </>
  );
}

export default App;
