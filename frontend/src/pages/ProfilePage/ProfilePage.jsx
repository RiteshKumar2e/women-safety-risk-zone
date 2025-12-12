import React from 'react';
import './ProfilePage.css';
import { useAuth } from '../../context/AuthContext.jsx';

function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return <div style={{ padding: 16 }}>Please login to view profile.</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Profile</h2>
        <p><strong>Name:</strong> {user.name || 'N/A'}</p>
        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}

export default ProfilePage;
