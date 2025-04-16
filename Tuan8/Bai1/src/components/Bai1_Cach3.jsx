// Counter App - Implementation 3: Async with Redux Toolkit
import React, { useState } from "react";
import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";

// Async thunks
const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  // eslint-disable-next-line no-unused-vars
  async (amount, { dispatch }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);

const decrementAsync = createAsyncThunk(
  "counter/decrementAsync",
  // eslint-disable-next-line no-unused-vars
  async (amount, { dispatch }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);

// Create slice
const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value += action.payload;
      })
      .addCase(decrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(decrementAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value -= action.payload;
      });
  },
});

// Extract action creators
export const { increment, decrement } = counterSlice.actions;

// Create store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Counter component
function Counter() {
  const { value, status } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(1);

  const isLoading = status === "loading";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="p-8 bg-white rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-blue-400/30 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">
          Async Counter
        </h1>

        <div className="relative mb-8">
          <div className="overflow-hidden h-48 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blue-100 h-32 w-32 rounded-full flex items-center justify-center">
                <div className="bg-blue-200 h-24 w-24 rounded-full flex items-center justify-center">
                  <div className="bg-blue-300 h-16 w-16 rounded-full flex items-center justify-center">
                    <div
                      className={`text-5xl font-bold text-blue-600 ${
                        value !== 0
                          ? "scale-110 transition-transform duration-300"
                          : ""
                      }`}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-blue-200 animate-spin"></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center mb-6">
          <input
            className="w-16 p-2 mr-2 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(Number(e.target.value) || 0)}
            min="1"
          />
          <span className="text-gray-600">Step Size</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            onClick={() => dispatch(increment())}
            className="px-4 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transform transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            disabled={isLoading}
          >
            Increase
          </button>

          <button
            onClick={() => dispatch(decrement())}
            className="px-4 py-3 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transform transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
            disabled={isLoading}
          >
            Decrease
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => dispatch(incrementAsync(incrementAmount))}
            className="px-4 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transform transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 flex items-center justify-center"
            disabled={isLoading}
          >
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              style={{ display: isLoading ? "block" : "none" }}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Async Increase
          </button>

          <button
            onClick={() => dispatch(decrementAsync(incrementAmount))}
            className="px-4 py-3 bg-pink-600 text-white font-bold rounded-lg shadow-md hover:bg-pink-700 transform transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:opacity-50 flex items-center justify-center"
            disabled={isLoading}
          >
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              style={{ display: isLoading ? "block" : "none" }}
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Async Decrease
          </button>
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
