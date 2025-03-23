import "./App.css";

import { useState, useRef } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);

  const handleAddOrUpdateTodo = () => {
    const value = inputRef.current.value.trim();

    if (!value) return;

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = value;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, value]); //Mảng mới có tất cả phần tử cũ + phần tử mới (value)
    }

    inputRef.current.value = "";
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index); //Lọc ra các phần tử thỏa mãn điều kiện, chỈ lấy index, ko lấy value
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    inputRef.current.value = todos[index];
    setEditIndex(index);
  };

  return (
    <div style={{ textAlign: "center", maxWidth: "400px", margin: "auto" }}>
      <h1>Todo App (Level 01)</h1>
      <input type="text" ref={inputRef} placeholder="Nhập công việc..." />
      <button onClick={handleAddOrUpdateTodo}>
        {editIndex !== null ? "Cập nhật" : "Thêm"}
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              margin: "10px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ccc",
              paddingBottom: "5px",
            }}
          >
            <span>{todo}</span>
            <div>
              <button onClick={() => handleEditTodo(index)}>✏️</button>
              <button onClick={() => handleDeleteTodo(index)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
