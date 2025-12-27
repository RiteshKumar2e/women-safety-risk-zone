import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../services/apiClient';
import '../LoginPage/LoginPage.css'; // Reusing styles for consistency
import './RegisterPage.css';

const GOOGLE_CLIENT_ID = "951248037202-st6tgbo07tjljditc95n7kuvgqr7a7mg.apps.googleusercontent.com";

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

    setLoading(true);
    try {
      const res = await apiClient.post('/auth/register', { name, email, password });
      login(res.data);
      navigate('/map');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setGoogleLoading(true);
    const redirectUri = window.location.origin + '/auth/google/callback';
    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?status=signup&response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid%20profile%20email`;
    window.location.href = googleUrl;
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo" onClick={() => navigate('/')}>
          🛡️ SafeZone AI
        </div>

        <div className="auth-card-saas">
          <div className="auth-header-saas">
            <h1>Create your account</h1>
            <p>Start your 14-day professional trial today</p>
          </div>

          <div className="google-auth-section">
            <button
              className="google-btn-saas"
              onClick={handleGoogleSignup}
              disabled={googleLoading || loading}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
              <span>Sign up with Google</span>
            </button>
          </div>

          <div className="auth-divider-saas">
            <span>OR REGISTER WITH EMAIL</span>
          </div>

          {error && <div className="auth-error-saas">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form-saas">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Work Email</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-auth-submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create free account'}
            </button>
          </form>

          <div className="auth-footer-saas">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>

        <div className="auth-legal">
          By signing up, you agree to our <a href="#">Terms</a>, <a href="#">Privacy Policy</a> and <a href="#">Cookie Use</a>.
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;