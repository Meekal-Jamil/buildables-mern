# React State Management Comparison: Context API vs Zustand

This project demonstrates two approaches to state management in React:

- **Context API** (with useState)
- **Zustand** (a minimal state management library)

## How it works

- The app is a simple counter.
- You can toggle between Context API and Zustand implementations using the buttons at the top.
- Both counters have increment, decrement, and reset functionality.

## Why these approaches?

- **Context API** is built into React and is great for simple or medium-complexity global state.
- **Zustand** is a modern, minimal, and scalable state management library that avoids prop drilling and re-renders efficiently.

## How to run

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm start
   ```

## Files
- `App.js` — UI and toggle logic
- `CounterContextDemo.js` — Context API implementation
- `CounterZustandDemo.js` — Zustand implementation

## Learn more
- [React Context API](https://react.dev/reference/react/createContext)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)

---

**Try toggling between the two to see how each approach works!**
