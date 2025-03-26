// import { useState } from "react";
import "./App.css";
import { useReducer, useRef, useState, useEffect } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import Home from "./components/Home";

// useRef chỉ có thể dùng trong component function
// const initialState = useRef({ count: 0 });
const initialState = { count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return {
        count: 0,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef(null);
  const [text, setText] = useState(null);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSubmit = () => {
    setText(inputRef.current.value);
  };

  useEffect(() => {
    const getDataProduct = async () => {
      try {
        const respone = await fetch(
          "https://67e369672ae442db76d00431.mockapi.io/product"
        );
        const data = await respone.json();
        setProduct(data.slice(0, 5));
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };
    getDataProduct();
  }, []);

  console.log("Số lần render của useReducer!");
  return (
    <>
      <div>
        <p style={{ fontWeight: 800, fontSize: "20px" }}>1. useReducer (+,-)</p>
        <h3>Count: {state.count}</h3>
        <button onClick={() => dispatch({ type: "increment" })}>+</button>
        <button onClick={() => dispatch({ type: "decrement" })}>-</button>
        <button onClick={() => dispatch({ type: "reset" })}>reset</button>
      </div>

      <div>
        <p style={{ fontWeight: 800, fontSize: "20px" }}>
          2.useRef với useState
        </p>
        <h3>Vui lòng nhập tên của bạn!</h3>
        <input type="text" placeholder="Nhập tên của bạn" ref={inputRef} />
        <button onClick={handleSubmit}>Hiển thị tên của bạn</button>
        <p>Tên của bạn là: {text}</p>
      </div>

      <div>
        <p style={{ fontWeight: 800, fontSize: "20px" }}>
          3. useEffect(load get api)
        </p>
        <h3>Thông tin của sản phẩm</h3>
        {loading ? <p>Đang tải...</p> : null}
        <ul>
          {product.map((product) => (
            <li key={product.id}>
              <p>Ma so sp: {product.id}</p>
              <p>Ten sp: {product.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
