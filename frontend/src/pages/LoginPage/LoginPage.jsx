import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../services/apiClient';
import './LoginPage.css';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      login(res.data);
      navigate('/map');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials or server error.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      // TODO: Implement real Google OAuth URL (backend integration needed)
      setTimeout(() => {
        setGoogleLoading(false);
        setError('Google login integration pending (backend OAuth needed).');
      }, 800);
    } catch (err) {
      setGoogleLoading(false);
      setError('Google login failed, please try normal login.');
    }
  };

  return (
    <div className="auth-page auth-page--login">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">Login to your account</p>
        </div>

        {/* Google login section */}
        <div className="auth-oauth">
          <button
            type="button"
            className="auth-google-btn"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
          >
            <span className="auth-google-icon">G</span>
            <span>
              {googleLoading ? 'Connecting to Google…' : 'Continue with Google'}
            </span>
          </button>
          <div className="auth-divider">
            <span className="auth-divider-line" />
            <span className="auth-divider-text">or use email</span>
            <span className="auth-divider-line" />
          </div>
        </div>

        {error && <div className="auth-error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              placeholder="your@email.com"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="auth-button auth-button--primary"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-footer-text">
          <p>
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="auth-link-button"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;