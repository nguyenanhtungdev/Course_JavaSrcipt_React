// ThemeToggleUseState.jsx
import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggleUseState = () => {
  const [theme, setTheme] = useState("light");

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

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Theme Toggle with useState
      </h2>
      <div className="flex items-center justify-between">
        <span className="font-medium">Current Theme: {theme}</span>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          style={{
            background: theme === "light" ? "#f8f9fa" : "#333",
            color: theme === "light" ? "#333" : "#f8f9fa",
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

export default ThemeToggleUseState;
