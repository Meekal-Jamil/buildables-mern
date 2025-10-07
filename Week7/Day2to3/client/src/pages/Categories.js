import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, createCategory, deleteCategory } from '../redux/slices/categorySlice';
import CategoryCard from '../components/CategoryCard';
import './Categories.css';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.categories);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#3b82f6',
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory(formData));
    setFormData({ name: '', description: '', color: '#3b82f6' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(id));
    }
  };

  if (isLoading) {
    return <div className="loading">Loading categories...</div>;
  }

  return (
    <div className="categories">
      <div className="categories-header">
        <h1>Categories</h1>
        <button 
          className="add-category-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Category'}
        </button>
      </div>
      
      {showForm && (
        <div className="category-form">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Category name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
              />
            </div>
            <textarea
              placeholder="Description (optional)"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            <button type="submit">Create Category</button>
          </form>
        </div>
      )}
      
      <div className="categories-grid">
        {categories.length === 0 ? (
          <div className="no-categories">
            <p>No categories found. Create your first category!</p>
          </div>
        ) : (
          categories.map(category => (
            <CategoryCard 
              key={category._id} 
              category={category} 
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Categories;