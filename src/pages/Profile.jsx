/**
 * Profile Page
 * Display user information and account details
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryCard from '../components/common/SummaryCard.jsx';
import { ROUTE_PATHS } from '../utils/constants.js';

const Profile = React.memo(({ user, onLogout }) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="page-container profile-page">
        <div className="profile-container">
          <div className="profile-card">
            <p className="profile-message">Please log in to view your profile.</p>
            <button
              className="btn-link"
              onClick={() => navigate(ROUTE_PATHS.LOGIN)}
              aria-label="Go to login page"
            >
              ← Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    onLogout();
    navigate(ROUTE_PATHS.LOGIN);
  };

  const profileStats = [
    {
      title: 'Account Status',
      value: 'Active',
      icon: '✅',
      backgroundColor: '#dcfce7',
      textColor: '#15803d',
    },
    {
      title: 'Joined',
      value: new Date().toLocaleDateString(),
      icon: '📅',
      backgroundColor: '#dbeafe',
      textColor: '#1e40af',
    },
    {
      title: 'Last Login',
      value: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: '🕐',
      backgroundColor: '#fef08a',
      textColor: '#854d0e',
    },
  ];

  return (
    <div className="page-container profile-page">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{user.name}</h1>
              <p className="profile-email">{user.email}</p>
              <p className="profile-status">
                Logged in at {user.loginTime}
              </p>
            </div>
          </div>

          <section className="profile-section">
            <h2 className="section-title">Account Details</h2>
            <div className="cards-grid">
              {profileStats.map((stat, index) => (
                <SummaryCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  unit=""
                  icon={stat.icon}
                  backgroundColor={stat.backgroundColor}
                  textColor={stat.textColor}
                />
              ))}
            </div>
          </section>

          <section className="profile-section">
            <h2 className="section-title">Account Actions</h2>
            <div className="profile-actions">
              <button
                className="btn-logout"
                onClick={handleLogout}
                aria-label="Sign out of your account"
              >
                🚪 Sign Out
              </button>
              <button
                className="btn-link"
                onClick={() => navigate(ROUTE_PATHS.DASHBOARD)}
                aria-label="Return to dashboard"
              >
                ← Back to Dashboard
              </button>
            </div>
          </section>

          <section className="profile-section">
            <h2 className="section-title">Account Information</h2>
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{user.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{user.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Account Created:</span>
                <span className="detail-value">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Updated:</span>
                <span className="detail-value">{new Date().toLocaleString()}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
});

Profile.displayName = 'Profile';

export default Profile;
