import "./App.css";
import { ThemeProvider } from "./components/ThemeContext";
import Home from "./components/Home";
import UseRef from "./components/UseRef";

function App() {
  return (
    // Ở đây, <Home /> là children của <ThemeProvider>, vì vậy { children } trong ThemeProvider sẽ thay thế bằng <Home />.
    <ThemeProvider>
      <Home />
      <UseRef />
    </ThemeProvider>
  );
}

export default App;
