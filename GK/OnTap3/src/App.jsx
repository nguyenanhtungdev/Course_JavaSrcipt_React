import "./App.css";
import React, { useState, useCallback, useMemo, memo } from "react";

const TodoItem = memo(({ todo, onDelete }) => {
  console.log(`Render Todo: ${todo}`);
  return (
    <li>
      {todo} <button onClick={() => onDelete(todo)}>❌</button>
    </li>
  );
});

function TodoApp() {
  const [todos, setTodos] = useState(["Học React", "Code dự án"]);
  const [newTodo, setNewTodo] = useState("");

  const todoCount = useMemo(() => {
    console.log("Tính toán số lượng todos...");
    return todos.length;
  }, [todos]);

  const handleDelete = useCallback(
    (todo) => {
      setTodos((prevTodos) => prevTodos.filter((t) => t !== todo));
    },
    [setTodos]
  );

  const handleAddTodo = useCallback(() => {
    if (newTodo.trim() === "") return;
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setNewTodo("");
  }, [newTodo]);

  return (
    <div style={{ textAlign: "center", maxWidth: "400px", margin: "auto" }}>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Nhập công việc..."
      />
      <button onClick={handleAddTodo}>Thêm</button>

      <p>Số lượng todo: {todoCount}</p>

      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo} todo={todo} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
