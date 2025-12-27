import React from 'react';
import './ProfilePage.css';
import { useAuth } from '../../context/AuthContext.jsx';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Please login to view profile.</div>;
  }

  return (
    <div className="account-dashboard">
      <div className="container">
        <header className="account-header">
          <h1>Account Settings</h1>
          <p>Manage your professional profile and security preferences.</p>
        </header>

        <div className="account-grid">
          <aside className="account-menu">
            <ul className="menu-list">
              <li className="active">Personal Info</li>
              <li>Security</li>
              <li>Privacy & Data</li>
              <li>Notifications</li>
              <li>Plan & Billing</li>
            </ul>
          </aside>

          <main className="account-main">
            <div className="account-section-card">
              <div className="card-header">
                <h2>Personal Information</h2>
                <button className="btn-secondary-sm">Edit Profile</button>
              </div>
              <div className="card-body">
                <div className="info-row">
                  <div className="info-field">
                    <label>Full Name</label>
                    <span>{user.name || 'Anonymous User'}</span>
                  </div>
                  <div className="info-field">
                    <label>Professional Role</label>
                    <span className="role-badge">{user.role}</span>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-field">
                    <label>Email Address</label>
                    <span>{user.email}</span>
                  </div>
                  <div className="info-field">
                    <label>Connected Account</label>
                    <span>{user.provider || 'Email/Password'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="account-section-card warning-zone">
              <div className="card-header">
                <h2>Data & Privacy</h2>
              </div>
              <div className="card-body">
                <p>Downloading your personal safety reports and account data.</p>
                <button className="btn-outline-sm">Request Data Archive</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
