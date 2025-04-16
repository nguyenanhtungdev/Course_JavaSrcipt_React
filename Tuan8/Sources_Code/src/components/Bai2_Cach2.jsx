// Todo App - Implementation 2: Advanced with Redux Toolkit and Categories
import React, { useState } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

// Create slice for todos with categories
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    list: [
      {
        id: 1,
        text: "Learn Redux Toolkit",
        completed: false,
        category: "work",
      },
      { id: 2, text: "Build a Todo App", completed: true, category: "work" },
      { id: 3, text: "Go for a run", completed: false, category: "personal" },
    ],
    nextId: 4,
    filter: "all", // 'all', 'active', 'completed'
  },
  reducers: {
    addTodo: (state, action) => {
      const { text, category } = action.payload;
      state.list.push({
        id: state.nextId,
        text,
        category: category || "personal",
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
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.list = state.list.filter((todo) => !todo.completed);
    },
  },
});

// Extract action creators
export const { addTodo, toggleTodo, removeTodo, setFilter, clearCompleted } =
  todosSlice.actions;

// Create store
const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

// TodoItem component with animation
function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const categoryColors = {
    work: "bg-blue-100 text-blue-800",
    personal: "bg-green-100 text-green-800",
    shopping: "bg-yellow-100 text-yellow-800",
    health: "bg-red-100 text-red-800",
    other: "bg-purple-100 text-purple-800",
  };

  return (
    <li className="mb-2 group">
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
        <div className="flex items-center flex-1">
          <div className="relative">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
              className="w-5 h-5 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none cursor-pointer checked:bg-blue-500 checked:border-blue-500"
            />
            {todo.completed && (
              <svg
                className="absolute top-0 left-0 w-5 h-5 text-white pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>

          <div className="ml-3 flex-1">
            <p
              className={`${
                todo.completed ? "line-through text-gray-400" : "text-gray-800"
              } font-medium`}
            >
              {todo.text}
            </p>
          </div>

          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              categoryColors[todo.category] || categoryColors.other
            }`}
          >
            {todo.category}
          </div>
        </div>

        <button
          onClick={() => dispatch(removeTodo(todo.id))}
          className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}

// TodoList component
function TodoList() {
  const { list, filter } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  const [category, setCategory] = useState("personal");

  const categories = ["work", "personal", "shopping", "health", "other"];

  const filteredTodos = list.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo({ text: newTodo.trim(), category }));
      setNewTodo("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <p className="text-purple-100">Keep track of your daily tasks</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((cat) => (
              <label key={cat} className="inline-flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                  className="hidden"
                />
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                    category === cat
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </div>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
          >
            Add Task
          </button>
        </form>

        <div className="px-6 pb-4">
          <div className="flex justify-between mb-4">
            <div className="flex space-x-2">
              <button
                onClick={() => dispatch(setFilter("all"))}
                className={`px-3 py-1 rounded-md text-sm ${
                  filter === "all"
                    ? "bg-purple-100 text-purple-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                All
              </button>
              <button
                onClick={() => dispatch(setFilter("active"))}
                className={`px-3 py-1 rounded-md text-sm ${
                  filter === "active"
                    ? "bg-purple-100 text-purple-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => dispatch(setFilter("completed"))}
                className={`px-3 py-1 rounded-md text-sm ${
                  filter === "completed"
                    ? "bg-purple-100 text-purple-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Completed
              </button>
            </div>

            <button
              onClick={() => dispatch(clearCompleted())}
              className="text-sm text-gray-500 hover:text-purple-600"
            >
              Clear completed
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-300 mb-2"
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
                <p>No tasks found. Add a new task to get started!</p>
              </div>
            ) : (
              <ul>
                {filteredTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </ul>
            )}
          </div>

          <div className="pt-4 text-sm text-gray-600 border-t border-gray-100 mt-4">
            <p>
              {list.filter((todo) => !todo.completed).length} items left to
              complete
            </p>
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
