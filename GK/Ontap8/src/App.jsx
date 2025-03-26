import "./App.css";
import useCounter from "./useCounter";

function App() {
  const [count, increase, decrease, reset] = useCounter(5);

  return (
    <>
      <div>
        <h2>Customhook: useCounter</h2>
        <p>Count: {count}</p>
        <button onClick={increase}>Tang</button>
        <button onClick={decrease}>Giam</button>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  );
}

export default App;
