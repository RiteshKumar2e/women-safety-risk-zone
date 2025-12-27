import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../services/apiClient';
import './LoginPage.css';

const GOOGLE_CLIENT_ID = "951248037202-st6tgbo07tjljditc95n7kuvgqr7a7mg.apps.googleusercontent.com";

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

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    // Redirect to Google OAuth
    const redirectUri = window.location.origin + '/auth/google/callback';
    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${translateRedirect(redirectUri)}&scope=openid%20profile%20email`;

    window.location.href = googleUrl;
  };

  // Helper to ensure redirect URI is handled correctly (simple version)
  const translateRedirect = (uri) => encodeURIComponent(uri);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo" onClick={() => navigate('/')}>
          🛡️ SafeZone AI
        </div>

        <div className="auth-card-saas">
          <div className="auth-header-saas">
            <h1>Sign in to SafeZone</h1>
            <p>Enter your details to access safety analytics</p>
          </div>

          <div className="google-auth-section">
            <button
              className="google-btn-saas"
              onClick={handleGoogleLogin}
              disabled={googleLoading || loading}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="auth-divider-saas">
            <span>OR CONTINUE WITH EMAIL</span>
          </div>

          {error && <div className="auth-error-saas">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form-saas">
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
              <div className="label-row">
                <label>Password</label>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-auth-submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-footer-saas">
            Don't have an account? <Link to="/register">Create one for free</Link>
          </div>
        </div>

        <div className="auth-legal">
          By continuing, you agree to SafeZone's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}

export default LoginPage;