/**
 * Navigation Component
 * Route-based navigation with active route highlighting
 */

import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from '../../utils/constants.js';

const Navigation = React.memo(({ user }) => {
  const location = useLocation();

  const navItems = useMemo(() => {
    const items = [
      {
        path: ROUTE_PATHS.DASHBOARD,
        label: '📊 Dashboard',
        ariaLabel: 'Dashboard - View overall progress',
        showAlways: true,
      },
      {
        path: ROUTE_PATHS.MODULES,
        label: '📖 Modules',
        ariaLabel: 'Modules - View module-wise progress',
        showAlways: true,
      },
      {
        path: ROUTE_PATHS.ANALYTICS,
        label: '📈 Analytics',
        ariaLabel: 'Analytics - View detailed analytics',
        showAlways: true,
      },
    ];

    // Add authentication-related items
    if (user) {
      items.push({
        path: ROUTE_PATHS.PROFILE,
        label: '👤 Profile',
        ariaLabel: 'Profile - View your account information',
        showAlways: true,
      });
    } else {
      items.push({
        path: ROUTE_PATHS.LOGIN,
        label: '🔐 Sign In',
        ariaLabel: 'Sign In - Authenticate to your account',
        showAlways: true,
      });
    }

    return items;
  }, [user]);

  return (
    <nav className="app-navigation" role="navigation" aria-label="Main navigation">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path} className="nav-item">
            <Link
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              aria-label={item.ariaLabel}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
