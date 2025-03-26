import "./App.css";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/about" element={<About></About>} />
      </Routes>
    </>
  );
}

export default App;
