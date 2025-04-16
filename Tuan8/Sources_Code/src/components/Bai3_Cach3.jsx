// ThemeToggleReduxToolkit.jsx
import React, { useEffect } from "react";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";
import { Moon, Sun } from "lucide-react";

// Create a theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState: "light",
  reducers: {
    toggleTheme: (state) => {
      return state === "light" ? "dark" : "light";
    },
  },
});

// Export actions
export const { toggleTheme } = themeSlice.actions;

// Create store
const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
  },
});

// Theme toggle component that uses Redux state
const ThemeToggleButton = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    // Apply theme to document body
    document.body.className = theme;

    // Add CSS for theme
    const style = document.createElement("style");
    style.innerHTML = `
      body.light {
        background-color: #ffffff;
        color: #333333;
        transition: all 0.3s ease;
      }
      body.dark {
        background-color: #1a1a1a;
        color: #f8f9fa;
        transition: all 0.3s ease;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [theme]);

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Theme Toggle with Redux Toolkit
      </h2>
      <div className="flex items-center justify-between">
        <span className="font-medium">Current Theme: {theme}</span>
        <button
          onClick={() => dispatch(toggleTheme())}
          className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          style={{
            background: theme === "light" ? "#f8f9fa" : "#333",
            color: theme === "light" ? "#333" : "#f8f9fa",
            boxShadow:
              theme === "light"
                ? "0 4px 6px rgba(0,0,0,0.1)"
                : "0 4px 6px rgba(255,255,255,0.1)",
          }}
        >
          {theme === "light" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

// Wrap the component with provider
const ThemeToggleReduxToolkit = () => {
  return (
    <Provider store={store}>
      <ThemeToggleButton />
    </Provider>
  );
};

export default ThemeToggleReduxToolkit;
