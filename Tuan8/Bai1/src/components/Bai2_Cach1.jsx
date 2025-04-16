// Todo App - Implementation 1: Basic with Redux Toolkit
import React, { useState } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

// Create slice for todos
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    list: [
      { id: 1, text: "Learn Redux Toolkit", completed: false },
      { id: 2, text: "Build a Todo App", completed: true },
    ],
    nextId: 3,
  },
  reducers: {
    addTodo: (state, action) => {
      state.list.push({
        id: state.nextId,
        text: action.payload,
        completed: false,
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
  },
});

// Extract action creators
export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions;

// Create store
const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

// TodoItem component
function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <li className="flex items-center justify-between p-3 border-b border-gray-200 group">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
          className="w-4 h-4 mr-3 focus:ring-blue-500"
        />
        <span
          className={`${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => dispatch(removeTodo(todo.id))}
        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </li>
  );
}

// TodoList component
function TodoList() {
  const todos = useSelector((state) => state.todos.list);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-indigo-600 text-white p-4">
          <h1 className="text-2xl font-bold text-center">To-Do List</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-b border-gray-200">
          <div className="flex">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-grow px-4 py-2 mr-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-r hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>
        </form>

        <ul className="divide-y divide-gray-200 max-h-80 overflow-y-auto">
          {todos.length === 0 ? (
            <li className="p-4 text-center text-gray-500">
              No tasks yet! Add a task to get started.
            </li>
          ) : (
            todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          )}
        </ul>

        <div className="p-4 bg-gray-50 text-sm text-gray-600">
          {todos.filter((todo) => todo.completed).length} of {todos.length}{" "}
          tasks completed
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
