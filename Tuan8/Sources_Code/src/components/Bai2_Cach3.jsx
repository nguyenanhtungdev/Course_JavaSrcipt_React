// Todo App - Implementation 3: With Persistence and Drag-and-Drop
import React, { useState, useEffect } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

// Load todos from localStorage
const loadTodos = () => {
  try {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return {
      list: [
        {
          id: 1,
          text: "Learn Redux Toolkit",
          completed: false,
          priority: "high",
        },
        {
          id: 2,
          text: "Build a Todo App",
          completed: true,
          priority: "medium",
        },
      ],
      nextId: 3,
    };
  } catch (e) {
    console.error("Error loading todos from localStorage", e);
    return {
      list: [],
      nextId: 1,
    };
  }
};

// Create slice for todos
const todosSlice = createSlice({
  name: "todos",
  initialState: loadTodos(),
  reducers: {
    addTodo: (state, action) => {
      const { text, priority } = action.payload;
      state.list.push({
        id: state.nextId,
        text,
        completed: false,
        priority: priority || "medium",
      });
      state.nextId += 1;
    },
    toggleTodo: (state, action) => {
      const todo = state.list.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
    reorderTodos: (state, action) => {
      state.list = action.payload;
    },
    updateTodoPriority: (state, action) => {
      const { id, priority } = action.payload;
      const todo = state.list.find((todo) => todo.id === id);
      if (todo) {
        todo.priority = priority;
      }
    },
  },
});

// Extract action creators
export const {
  addTodo,
  toggleTodo,
  removeTodo,
  reorderTodos,
  updateTodoPriority,
} = todosSlice.actions;

// Create store
const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

// Store subscription to save to localStorage
store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  } catch (e) {
    console.error("Error saving todos to localStorage", e);
  }
});

// TodoItem component
function TodoItem({ todo, index, onDragStart, onDragOver, onDrop }) {
  const dispatch = useDispatch();

  const priorityColors = {
    high: "border-l-4 border-red-500",
    medium: "border-l-4 border-yellow-500",
    low: "border-l-4 border-green-500",
  };

  return (
    <li
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, index)}
      className={`mb-2 bg-white rounded-lg shadow ${
        priorityColors[todo.priority] || "border-l-4 border-gray-300"
      }`}
    >
      <div className="flex items-center p-4 cursor-grab active:cursor-grabbing">
        <div className="flex-shrink-0">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>

        <div className="ml-3 flex-grow">
          <p
            className={`${
              todo.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {todo.text}
          </p>
        </div>

        <div className="flex-shrink-0 ml-4">
          <select
            value={todo.priority}
            onChange={(e) =>
              dispatch(
                updateTodoPriority({ id: todo.id, priority: e.target.value })
              )
            }
            className="mr-2 text-sm rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            onClick={() => dispatch(removeTodo(todo.id))}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}

// TodoList component
function TodoList() {
  const todos = useSelector((state) => state.todos.list);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  const [priority, setPriority] = useState("medium");
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  // Save to localStorage when todos change
  useEffect(() => {
    try {
      localStorage.setItem(
        "todos",
        JSON.stringify({
          list: todos,
          nextId: todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
        })
      );
    } catch (e) {
      console.error("Error saving todos to localStorage", e);
    }
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo({ text: newTodo.trim(), priority }));
      setNewTodo("");
    }
  };

  const handleDragStart = (e, index) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // For Firefox compatibility
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedItemIndex !== null) {
      const newTodos = [...todos];
      const [draggedItem] = newTodos.splice(draggedItemIndex, 1);
      newTodos.splice(dropIndex, 0, draggedItem);
      dispatch(reorderTodos(newTodos));
      setDraggedItemIndex(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-200 via-indigo-100 to-purple-200 p-4">
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-filter backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h1 className="text-2xl font-bold text-white flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Drag & Drop To-Do List
          </h1>
          <p className="text-blue-100 mt-1">
            Your tasks are saved automatically
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 border-b border-gray-200">
          <div className="mb-4">
            <label
              htmlFor="todo-input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Task
            </label>
            <input
              id="todo-input"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <label
                htmlFor="priority"
                className="text-sm font-medium text-gray-700"
              >
                Priority:
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="text-sm rounded border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>

        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Your Tasks</h2>
          <p className="text-sm text-gray-500 mb-4">
            Drag and drop to reorder tasks
          </p>

          <div className="max-h-96 overflow-y-auto">
            {todos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-300 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <p>Your todo list is empty! Add a task to get started.</p>
              </div>
            ) : (
              <ul>
                {todos.map((todo, index) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    index={index}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  />
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>
                {todos.filter((todo) => !todo.completed).length} items left
              </div>
              <div className="flex space-x-1 text-xs">
                <div className="flex items-center mr-2">
                  <span className="w-3 h-3 inline-block bg-red-500 rounded-full mr-1"></span>
                  <span>
                    High:{" "}
                    {todos.filter((todo) => todo.priority === "high").length}
                  </span>
                </div>
                <div className="flex items-center mr-2">
                  <span className="w-3 h-3 inline-block bg-yellow-500 rounded-full mr-1"></span>
                  <span>
                    Medium:{" "}
                    {todos.filter((todo) => todo.priority === "medium").length}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 inline-block bg-green-500 rounded-full mr-1"></span>
                  <span>
                    Low:{" "}
                    {todos.filter((todo) => todo.priority === "low").length}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to clear all completed tasks?"
                );
                if (confirmed) {
                  dispatch(
                    reorderTodos(todos.filter((todo) => !todo.completed))
                  );
                }
              }}
              className="mt-4 text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              Clear completed tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// App wrapper component
export default function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}
