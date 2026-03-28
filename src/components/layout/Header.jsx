import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = React.memo(({ lastUpdated, onRefresh, user }) => {
  const formatTime = (date) => {
    if (!date) return 'Never';
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow">

      <NavLink className="navbar-brand" to="/">
        📚 Learning Tracker
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">

        {/* LEFT */}
        <ul className="navbar-nav me-auto">

          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/modules">
              Modules
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/analytics">
              Analytics
            </NavLink>
          </li>

        </ul>

        {/* RIGHT */}
        <div className="d-flex align-items-center text-white">

          <small className="me-3">
            Updated {formatTime(lastUpdated)}
          </small>

          <button
            className="btn btn-outline-light btn-sm me-2"
            onClick={onRefresh}
          >
            🔄
          </button>

          {/* 🔥 LOGIN / PROFILE SWITCH */}
          {user ? (
            <NavLink className="btn btn-success btn-sm" to="/profile">
              {user.name}
            </NavLink>
          ) : (
            <NavLink className="btn btn-primary btn-sm" to="/login">
              Sign In
            </NavLink>
          )}

        </div>

      </div>
    </nav>
  );
});

Header.displayName = 'Header';

export default Header;
