import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/slices/taskSlice';
import { fetchCategories } from '../redux/slices/categorySlice';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import { openModal } from '../redux/slices/uiSlice';
import './TaskList.css';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.tasks);
  
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return task.priority === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'createdAt') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  const handleAddTask = () => {
    dispatch(openModal({ type: 'CREATE_TASK' }));
  };

  if (isLoading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h1>My Tasks</h1>
        <button className="add-task-btn" onClick={handleAddTask}>
          + Add Task
        </button>
      </div>
      
      <div className="task-filters">
        <div className="filter-group">
          <label>Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="createdAt">Created Date</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
      
      <div className="tasks-container">
        {sortedTasks.length === 0 ? (
          <div className="no-tasks">
            <p>No tasks found. Create your first task!</p>
          </div>
        ) : (
          sortedTasks.map(task => (
            <TaskItem key={task._id} task={task} />
          ))
        )}
      </div>
      
      <TaskForm />
    </div>
  );
};

export default TaskList;