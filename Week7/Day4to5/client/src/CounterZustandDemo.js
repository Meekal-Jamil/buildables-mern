import React from 'react';
import create from 'zustand';

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

function Counter() {
  const { count, increment, decrement, reset } = useCounterStore();
  return (
    <div className="counter-section">
      <h2>Zustand Counter</h2>
      <div className="counter-value">{count}</div>
      <div className="counter-controls">
        <button onClick={decrement} aria-label="Decrement">-</button>
        <button className="reset-btn" onClick={reset} aria-label="Reset">⟳</button>
        <button onClick={increment} aria-label="Increment">+</button>
      </div>
    </div>
  );
}

export default function CounterZustandDemo() {
  return <Counter />;
}
