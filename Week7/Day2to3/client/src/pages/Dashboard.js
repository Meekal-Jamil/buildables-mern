import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskStats } from '../redux/slices/taskSlice';
import { fetchCategories } from '../redux/slices/categorySlice';
import DashboardCard from '../components/DashboardCard';
import RecentTasks from '../components/RecentTasks';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, tasks } = useSelector((state) => state.tasks);
  const { categories } = useSelector((state) => state.categories);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchTaskStats());
    dispatch(fetchCategories());
  }, [dispatch]);

  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Here's what's happening with your tasks today.</p>
      </div>
      
      <div className="dashboard-stats">
        <DashboardCard
          title="Total Tasks"
          value={stats.total || 0}
          icon="📝"
          color="blue"
        />
        <DashboardCard
          title="Completed"
          value={stats.completed || 0}
          icon="✅"
          color="green"
        />
        <DashboardCard
          title="In Progress"
          value={stats.inProgress || 0}
          icon="⏳"
          color="yellow"
        />
        <DashboardCard
          title="Categories"
          value={categories.length}
          icon="📁"
          color="purple"
        />
      </div>
      
      <div className="dashboard-content">
        <div className="recent-tasks-section">
          <h2>Recent Tasks</h2>
          <RecentTasks tasks={recentTasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;