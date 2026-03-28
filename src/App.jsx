import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ModulesPage from './pages/ModulesPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';

import { useProgressData } from './hooks/useProgressData.js';
import { ROUTE_PATHS } from './utils/constants.js';

import './App.css';
import './styles/components.css';
import './styles/layout.css';
import './styles/charts.css';

function App() {
  const {
    modules,
    trendData,
    activities,
    isLoading,
    lastUpdated,
    updateModuleActivities,
    addModuleTime,
    refreshData,
  } = useProgressData();

  const [user, setUser] = useState(null);

  const handleLoginSuccess = useCallback((userData) => {
    setUser(userData);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <Router>
      <Layout lastUpdated={lastUpdated} onRefresh={refreshData} user={user}>
        <Routes>

          {/* ✅ Dashboard (main + fix for blank issue) */}
          <Route
            path="/"
            element={
              <Dashboard
                modules={modules}
                activities={activities}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path="/dashboard"
            element={
              <Dashboard
                modules={modules}
                activities={activities}
                isLoading={isLoading}
              />
            }
          />

          {/* ✅ Modules */}
          <Route
            path={ROUTE_PATHS.MODULES}
            element={
              <ModulesPage
                modules={modules}
                activities={activities}
                isLoading={isLoading}
                onUpdateModule={updateModuleActivities}
                onAddTime={addModuleTime}
              />
            }
          />

          {/* ✅ Analytics */}
          <Route
            path={ROUTE_PATHS.ANALYTICS}
            element={
              <AnalyticsPage
                modules={modules}
                trendData={trendData}
                activities={activities}
                isLoading={isLoading}
              />
            }
          />

          {/* ✅ Login (NO extra Layout here) */}
          <Route
            path={ROUTE_PATHS.LOGIN}
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />

          {/* ✅ Profile */}
          <Route
            path={ROUTE_PATHS.PROFILE}
            element={<Profile user={user} onLogout={handleLogout} />}
          />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
