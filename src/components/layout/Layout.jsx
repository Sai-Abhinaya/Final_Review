import React from 'react';
import Header from './Header.jsx';

const Layout = React.memo(({ children, lastUpdated, onRefresh, user }) => {
  return (
    <div className="app-layout">

      <Header
        lastUpdated={lastUpdated}
        onRefresh={onRefresh}
        user={user}
      />

      <main className="app-main container mt-3">
        {children}
      </main>

    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;