import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../services/apiClient';
import './RegisterPage.css';

function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await apiClient.post('/auth/register', {
        name,
        email,
        password,
      });

      // Auto-login after registration
      login(res.data);
      navigate('/map');

      // Alternative: redirect to login page
      // navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      // TODO: Implement real Google OAuth integration
      setTimeout(() => {
        setGoogleLoading(false);
        setError('Google signup/login integration pending (backend OAuth).');
      }, 800);
    } catch (err) {
      setGoogleLoading(false);
      setError('Google signup failed, please use email.');
    }
  };

  return (
    <div className="auth-page auth-page--register">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Sign up to get started</p>
        </div>

        {/* Google signup section */}
        <div className="auth-oauth">
          <button
            type="button"
            className="auth-google-btn"
            onClick={handleGoogleSignup}
            disabled={googleLoading || loading}
          >
            <span className="auth-google-icon">G</span>
            <span>
              {googleLoading
                ? 'Connecting to Google…'
                : 'Sign up with Google'}
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
            <label className="auth-label">Full Name</label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="auth-input"
              placeholder="John Doe"
            />
          </div>

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

          <div className="auth-field">
            <label className="auth-label">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="auth-input"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="auth-button auth-button--secondary"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="auth-footer-text">
          <p>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="auth-link-button"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;