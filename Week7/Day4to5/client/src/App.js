import React, { useState } from 'react';
import CounterContextDemo from './CounterContextDemo';
import CounterZustandDemo from './CounterZustandDemo';
import './App.css';

function App() {
  const [mode, setMode] = useState('context');

  return (
    <div className="app-container">
      <h1>React State Management: Counter</h1>
      <div className="toggle-btns">
        <button
          className={mode === 'context' ? 'active' : ''}
          onClick={() => setMode('context')}
          disabled={mode === 'context'}
        >
          Context API
        </button>
        <button
          className={mode === 'zustand' ? 'active' : ''}
          onClick={() => setMode('zustand')}
          disabled={mode === 'zustand'}
        >
          Zustand
        </button>
      </div>
      {mode === 'context' ? <CounterContextDemo /> : <CounterZustandDemo />}
      <div className="footer-note">
        Toggle above to compare Context API and Zustand for state management.
      </div>
    </div>
  );
}

export default App;
