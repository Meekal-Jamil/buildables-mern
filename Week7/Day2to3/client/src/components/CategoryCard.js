import React from 'react';
import './CategoryCard.css';

const CategoryCard = ({ category, onDelete }) => {
  const handleDelete = () => {
    onDelete(category._id);
  };

  return (
    <div className="category-card">
      <div 
        className="category-color"
        style={{ backgroundColor: category.color }}
      ></div>
      
      <div className="category-content">
        <h3>{category.name}</h3>
        {category.description && (
          <p className="category-description">{category.description}</p>
        )}
        
        <div className="category-stats">
          <span className="task-count">
            {category.taskCount || 0} tasks
          </span>
        </div>
      </div>
      
      <div className="category-actions">
        <button className="delete-btn" onClick={handleDelete}>
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;