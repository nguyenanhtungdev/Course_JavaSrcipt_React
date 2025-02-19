import { useState } from "react";
import "./App.css"; // Import CSS
import component_button from "./components/Buttons/component_button";
function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  // const [open, setOpen] = useState(false);

  // Thêm công việc vào danh sách
  const addTask = () => {
    if (input.trim() == "") {
      alert("Vui lòng nhập dữ liệu!");
    } else {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  // Xóa công việc
  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="todo-container">
      <h2>📋 Todo List</h2>
      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập công việc..."
        />
        <button onClick={addTask}>Thêm</button>
      </div>
      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className="todo-item">
            <span>{task}</span>
            <button onClick={() => removeTask(index)}>❌</button>
          </li>
        ))}
      </ul>
      <component_button>Hi</component_button>
    </div>
  );
}

export default TodoApp;
