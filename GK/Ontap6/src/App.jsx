import "./App.css";
import { useEffect, useReducer, useState } from "react";

function todoReducer(state, action) {
  switch (action.type) {
    case "GET_TODO":
      return action.payload;
    case "ADD_TODO":
      return [...state, action.payload];
    case "UPDATE_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

const API = "https://jsonplaceholder.typicode.com/todos?_limit=5";

function App() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const respone = await fetch(API);
        const data = await respone.json();
        dispatch({ type: "GET_TODO", payload: data });
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
    getData();
  }, []);

  const addTodo = async () => {
    const newTodo = {
      title: text,
      completed: false,
    };
    const res = await fetch(API, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch({ type: "ADD_TODO", payload: data });
    setText("");
  };

  const toggleTodo = async (todo) => {
    const updated = { ...todo, completed: !todo.completed };
    const res = await fetch(`${API}/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify(updated),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch({ type: "UPDATE_TODO", payload: data });
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    dispatch({ type: "DELETE_TODO", payload: id });
  };
  return (
    <div style={{ padding: "20px" }}>
      <h2>📝 Todo App (useReducer + API)</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Thêm việc..."
      />
      <button onClick={addTodo}>Thêm</button>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            <span onClick={() => toggleTodo(todo)}>{todo.title}</span>
            <button
              style={{ marginLeft: 10 }}
              onClick={() => deleteTodo(todo.id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
