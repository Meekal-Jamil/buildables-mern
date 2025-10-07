import { useState, useEffect } from 'react';

function Dashboard({ user, token, onLogout }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [updateName, setUpdateName] = useState(user.name);
  const [updateSuccess, setUpdateSuccess] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (user.role === 'admin') {
      fetchAllUsers();
    }
  }, [user.role]);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setUpdateSuccess('');
    setUpdateLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: updateName })
      });

      const data = await response.json();
      if (data.success) {
        setUpdateSuccess('Profile updated successfully!');
        setTimeout(() => setUpdateSuccess(''), 3000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to update profile');
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="user-info">
          <h2>Welcome back, {user.name}! 👋</h2>
          <p>📧 {user.email}</p>
          <span className="user-badge">{user.role}</span>
        </div>
        <button className="btn btn-danger" onClick={onLogout}>
          🚪 Logout
        </button>
      </div>

      <div className="dashboard-content">
        <h3>🛠️ Update Profile</h3>
        <form onSubmit={handleUpdateProfile} style={{ marginBottom: '3rem' }}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={updateLoading}
          >
            {updateLoading ? '⏳ Updating...' : '✅ Update Profile'}
          </button>
          {updateSuccess && <div className="success">✨ {updateSuccess}</div>}
        </form>

        {user.role === 'admin' && (
          <>
            <h3>👥 User Management (Admin Panel)</h3>
            {loading ? (
              <div className="loading">Loading users</div>
            ) : (
              <div>
                <p style={{ marginBottom: '1rem', color: '#666' }}>
                  Total Users: <strong>{users.length}</strong>
                </p>
                {users.map(u => (
                  <div key={u._id} className="user-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong>👤 {u.name}</strong>
                        <br />
                        <span style={{ color: '#666', fontSize: '0.9rem' }}>📧 {u.email}</span>
                      </div>
                      <span className="user-role">{u.role}</span>
                    </div>
                    <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#999' }}>
                      📅 Joined: {new Date(u.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {error && <div className="error">❌ {error}</div>}
        
        {!loading && user.role !== 'admin' && (
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            borderRadius: '15px',
            marginTop: '2rem'
          }}>
            <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>🎉 Welcome to Your Dashboard!</h4>
            <p style={{ color: '#666' }}>This is your personal space. You can update your profile and manage your account settings here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;