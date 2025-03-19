import React from "react";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <p style={{ fontWeight: 800, fontSize: "20px" }}>
        4. useState -- useContext(State global)
      </p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
