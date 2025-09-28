function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <div className="task-content">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
          <div className="task-actions">
            <button 
              onClick={() => onToggle(task._id)}
              className="toggle-btn"
            >
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button 
              onClick={() => onDelete(task._id)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;