import { useState, useRef } from "react";
import "./App.css";
import { Test } from "./Test";

function App() {
  const [task, setTask] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);

  const handleSubmit = () => {
    const value = inputRef.current.value.trim();
    if (!value) return;

    if (isEdit && editIndex !== null) {
      const updatedTodos = [...task];
      updatedTodos[editIndex] = value;
      setTask(updatedTodos);
      setEditIndex(null);
      setIsEdit(false);
    } else {
      setTask((prev) => [...prev, value]);
    }

    handleFocus();
  };

  const handleRemoveTask = (index) => {
    const updateToto = task.filter((_, i) => i !== index);
    setTask(updateToto);
  };

  const handleFocus = () => {
    inputRef.current.focus();
    inputRef.current.value = "";
  };

  const resetTask = () => {
    handleFocus();
    setTask([]);
    setIsEdit(false);
    setEditIndex(null);
  };

  return (
    <>
      <div className="container">
        <h2>This Is A TODO APP</h2>
        <div className="container__top">
          <input type="text" ref={inputRef} placeholder="Enter a text" />
          <button onClick={handleSubmit}>
            {isEdit ? "Update Task" : "Add Task"}
          </button>
        </div>
        <div className="container__center">
          <p>Danh sách công việc hiện có</p>
          <ul>
            {task.map((value, index) => (
              <li key={index}>
                {index}. {value}
                <button
                  onClick={() => {
                    setEditIndex(index);
                    setIsEdit(true);
                    inputRef.current.value = task[index];
                    inputRef.current.focus();
                  }}
                >
                  Edit Task
                </button>
                <button onClick={() => handleRemoveTask(index)}>
                  Remove Task
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="container__bottom">
          <button onClick={resetTask}>Reset</button>
        </div>
      </div>
      <Test></Test>
    </>
  );
}

export default App;
