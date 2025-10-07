import React from 'react';
import { Link } from 'react-router-dom';
import './RecentTasks.css';

const RecentTasks = ({ tasks }) => {
  const formatDate = (dateString) => {
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

  return (
    <div className="recent-tasks">
      {tasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks yet. <Link to="/tasks">Create your first task!</Link></p>
        </div>
      ) : (
        <div className="tasks-list">
          {tasks.map(task => (
            <div key={task._id} className="task-item">
              <div className="task-info">
                <h4 className={task.completed ? 'completed' : ''}>
                  {task.title}
                </h4>
                <p className="task-description">{task.description}</p>
                <div className="task-meta">
                  <span 
                    className="task-priority"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {task.priority}
                  </span>
                  <span className="task-date">
                    {formatDate(task.createdAt)}
                  </span>
                </div>
              </div>
              <div className="task-status">
                {task.completed ? '✅' : '⏳'}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="view-all">
        <Link to="/tasks" className="view-all-link">
          View All Tasks →
        </Link>
      </div>
    </div>
  );
};

export default RecentTasks;