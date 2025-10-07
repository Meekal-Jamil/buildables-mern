import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('token');
        setToken(null);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('token');
      setToken(null);
    }
  };

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setIsLoggedIn(true);
    localStorage.setItem('token', authToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  const handleRegister = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setIsLoggedIn(true);
    setShowRegister(false);
    localStorage.setItem('token', authToken);
  };

  if (isLoggedIn && user) {
    return (
      <Dashboard 
        user={user} 
        token={token}
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <div className="App">
      <div className="auth-container">
        <h1>JWT Authentication</h1>
        
        {!showRegister ? (
          <>
            <Login onLogin={handleLogin} />
            <p>
              Don't have an account?{' '}
              <button 
                className="link-btn"
                onClick={() => setShowRegister(true)}
              >
                Register here
              </button>
            </p>
          </>
        ) : (
          <>
            <Register onRegister={handleRegister} />
            <p>
              Already have an account?{' '}
              <button 
                className="link-btn"
                onClick={() => setShowRegister(false)}
              >
                Login here
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;