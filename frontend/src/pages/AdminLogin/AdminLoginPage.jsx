import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../services/apiClient';
import '../LoginPage/LoginPage.css';

function AdminLoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await apiClient.post('/auth/login', { email, password });
            // Verify if the user is actually an admin
            if (res.data.role !== 'ADMIN') {
                setError('Access denied. This portal is for administrators only.');
                return;
            }
            login(res.data);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page admin-auth-bg">
            <div className="auth-container">
                <div className="auth-logo" onClick={() => navigate('/')}>
                    🛡️ SafeZone <span className="admin-badge">ADMIN</span>
                </div>

                <div className="auth-card-saas admin-border">
                    <div className="auth-header-saas">
                        <h1>Internal Admin Portal</h1>
                        <p>Restrictive access only. Please authenticate to proceed.</p>
                    </div>

                    {error && <div className="auth-error-saas">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form-saas">
                        <div className="form-group">
                            <label>Administrator ID (Email)</label>
                            <input
                                type="email"
                                placeholder="admin@safezone.ai"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Security Key (Password)</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn-auth-submit admin-btn" disabled={loading}>
                            {loading ? 'Verifying...' : 'Access Command Center'}
                        </button>
                    </form>
                </div>

                <div className="auth-legal">
                    Unauthorized access attempts are logged and monitored. IP: 127.0.0.1
                </div>
            </div>
        </div>
    );
}

export default AdminLoginPage;
