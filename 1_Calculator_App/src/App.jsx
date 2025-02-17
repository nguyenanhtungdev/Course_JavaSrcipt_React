import { useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState("");
  const XuLyTinhToan = (operator) => {
    var a = document.getElementById("input_a").value;
    var b = document.getElementById("input_b").value;

    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA) || isNaN(numB)) {
      setResult("Lỗi: Nhập số!");
      return;
    }

    let res = 0;
    switch (operator) {
      case "+":
        res = numA + numB;
        break;
      case "-":
        res = numA - numB;
        break;
      case "*":
        res = numA * numB;
        break;
      case "/":
        res = numB !== 0 ? numA / numB : "Lỗi: Chia 0";
        break;
      default:
        res = "Error!";
    }
    setResult(res);
  };

  const resetFields = () => {
    document.getElementById("input_a").value = "";
    document.getElementById("input_b").value = "";
    setResult("");
  };
  return (
    <>
      <div className="container">
        <p>Máy tính casio</p>
        <div className="list_input">
          <input type="text" placeholder="Nhập số a" id="input_a" />
          <input type="text" placeholder="Nhập số b" id="input_b" />
          <input type="text" placeholder="Result" value={result} disabled />
          <div className="list">
            <button onClick={() => XuLyTinhToan("+")}>+</button>
            <button onClick={() => XuLyTinhToan("-")}>-</button>
            <button onClick={() => XuLyTinhToan("*")}>*</button>
            <button onClick={() => XuLyTinhToan("/")}>/</button>
          </div>
        </div>
        <div className="list_button">
          <button onClick={resetFields}>Hủy bỏ</button>
          <button onClick={() => XuLyTinhToan("+")}>Tính toán</button>
        </div>
      </div>
    </>
  );
}

export default App;
