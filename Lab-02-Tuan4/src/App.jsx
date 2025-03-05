// import { useState } from "react";
import "./App.css";
import Header from "./Components/Header/header";
import Footer from "./Components/Footer/footer";
import Content from "./Components/Content/content";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div class="container">
        <Header />
        <Content />
        <Footer />
      </div>
    </>
  );
}

export default App;
