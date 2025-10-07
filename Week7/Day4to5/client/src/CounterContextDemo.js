import React, { createContext, useContext, useState } from 'react';

const CounterContext = createContext();

function CounterProvider({ children }) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);
  return (
    <CounterContext.Provider value={{ count, increment, decrement, reset }}>
      {children}
    </CounterContext.Provider>
  );
}

function Counter() {
  const { count, increment, decrement, reset } = useContext(CounterContext);
  return (
    <div className="counter-section">
      <h2>Context API Counter</h2>
      <div className="counter-value">{count}</div>
      <div className="counter-controls">
        <button onClick={decrement} aria-label="Decrement">-</button>
        <button className="reset-btn" onClick={reset} aria-label="Reset">⟳</button>
        <button onClick={increment} aria-label="Increment">+</button>
      </div>
    </div>
  );
}

export default function CounterContextDemo() {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
}
