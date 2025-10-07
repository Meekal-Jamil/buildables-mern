import { useState } from 'react';

function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        onRegister(data.user, data.token);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Registration failed. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>📝 Create Account</h2>
      
      <div className="form-group">
        <label>👤 Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your full name"
          autoComplete="name"
        />
      </div>

      <div className="form-group">
        <label>📧 Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          autoComplete="email"
        />
      </div>

      <div className="form-group">
        <label>🔒 Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
          placeholder="Choose a strong password (min 6 chars)"
          autoComplete="new-password"
        />
        <small style={{ color: '#666', fontSize: '0.8rem', marginTop: '0.25rem' }}>
          💡 Use at least 6 characters for better security
        </small>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? '⏳ Creating account...' : '✨ Create Account'}
      </button>

      {error && <div className="error">❌ {error}</div>}
    </form>
  );
}

export default Register;