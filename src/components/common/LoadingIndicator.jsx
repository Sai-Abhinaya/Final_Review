/**
 * LoadingIndicator Component
 * Accessible loading spinner with aria labels
 */

import React from 'react';

const LoadingIndicator = React.memo(
  ({ isLoading = true, message = 'Loading...', fullScreen = false }) => {
    if (!isLoading) return null;

    return (
      <div
        className={`loading-indicator ${fullScreen ? 'fullscreen' : ''}`}
        role="status"
        aria-live="polite"
        aria-label="Loading content"
      >
        <div className="spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    );
  }
);

LoadingIndicator.displayName = 'LoadingIndicator';

export default LoadingIndicator;
