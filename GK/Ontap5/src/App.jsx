import { useState } from "react";
import "./App.css";
import ExpensiveChild from "./ExpensiveChild";
import Memo from "./Memo";
import CallBack from "./CallBack";
import TinhToan from "./TinhToan";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("Hello");

  return (
    <>
      <h2>Count: {count}</h2>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Tang count
      </button>
      <button onClick={() => setText(text === "Hello" ? "Hi" : "Hello")}>
        Đổi Text
      </button>
      {/* <Memo value={text}></Memo> */}
      {/* <ExpensiveChild></ExpensiveChild> */}
      <CallBack></CallBack>
      <TinhToan></TinhToan>
    </>
  );
}

export default App;
