import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PATCH',
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(task => 
        task._id === id ? updatedTask : task
      ));
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <TaskList 
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;
