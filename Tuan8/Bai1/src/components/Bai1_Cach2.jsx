// Counter App - Implementation 2: Advanced with Redux Toolkit and Animations
import React, { useState, useEffect } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

// Create slice with more actions
const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    lastAction: null,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.lastAction = "increment";
    },
    decrement: (state) => {
      state.value -= 1;
      state.lastAction = "decrement";
    },
    reset: (state) => {
      state.value = 0;
      state.lastAction = "reset";
    },
  },
});

// Extract action creators
export const { increment, decrement, reset } = counterSlice.actions;

// Create store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Counter Display component with animation
const CounterDisplay = ({ value }) => {
  const [animateClass, setAnimateClass] = useState("");

  useEffect(() => {
    setAnimateClass("animate-bounce");
    const timer = setTimeout(() => setAnimateClass(""), 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative flex justify-center items-center my-8">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-indigo-500 rounded-full blur-xl opacity-70 animate-pulse"></div>
      <div
        className={`relative text-6xl font-extrabold text-white bg-gray-800 rounded-full h-32 w-32 flex items-center justify-center ${animateClass}`}
      >
        {value}
      </div>
    </div>
  );
};

// Button component
const Button = ({ onClick, color, children }) => {
  const colorClasses = {
    red: "bg-red-500 hover:bg-red-600 focus:ring-red-400",
    green: "bg-green-500 hover:bg-green-600 focus:ring-green-400",
    blue: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400",
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 ${colorClasses[color]} text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2`}
    >
      {children}
    </button>
  );
};

// Counter component
function Counter() {
  const { value, lastAction } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="p-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-white border-opacity-20 transform transition-all duration-300 hover:shadow-blue-500/20">
        <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
          Counter App
        </h1>

        <CounterDisplay value={value} />

        {lastAction && (
          <p className="text-center text-gray-300 mb-4">
            Last action: <span className="font-bold">{lastAction}</span>
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={() => dispatch(decrement())} color="red">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Decrease
            </span>
          </Button>

          <Button onClick={() => dispatch(reset())} color="blue">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Reset
            </span>
          </Button>

          <Button onClick={() => dispatch(increment())} color="green">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Increase
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

// App wrapper component
export default function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
