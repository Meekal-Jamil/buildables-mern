import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../redux/slices/taskSlice';
import { openModal } from '../redux/slices/uiSlice';
import './TaskItem.css';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch(updateTask({
      id: task._id,
      updates: { completed: !task.completed }
    }));
  };

  const handleEdit = () => {
    dispatch(openModal({ 
      type: 'EDIT_TASK', 
      data: task 
    }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task._id));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
        />
      </div>
      
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-meta">
          <span 
            className="task-priority"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.priority}
          </span>
          
          {task.category && (
            <span className="task-category">
              {task.category.name}
            </span>
          )}
          
          {task.dueDate && (
            <span className={`task-due-date ${isOverdue ? 'overdue' : ''}`}>
              Due: {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>
      
      <div className="task-actions">
        <button className="edit-btn" onClick={handleEdit}>
          ✎️
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;