import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className={`dashboard-card ${color}`}>
      <div className="card-icon">
        <span>{icon}</span>
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p className="card-value">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;