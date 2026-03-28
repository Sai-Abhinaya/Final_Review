/**
 * ProgressBar Component
 * Accessible progress indicator with status labels
 */

import React from 'react';
import { getProgressStatus } from '../../utils/dataCalculations.js';

const ProgressBar = React.memo(
  ({
    percentage,
    label = '',
    showLabel = true,
    height = '8px',
    showStatus = true,
    ariaLabel,
    fullWidth = false,
  }) => {
    const status = getProgressStatus(percentage);

    return (
      <div className={`progress-bar-container ${fullWidth ? 'full-width' : ''}`}>
        {(showLabel || showStatus) && (
          <div className="progress-bar-header">
            {showLabel && <span className="progress-label">{label}</span>}
            {showStatus && (
              <span className={`progress-status`} style={{ color: status.color }}>
                {percentage}% - {status.label}
              </span>
            )}
          </div>
        )}
        <div
          className="progress-bar-track"
          style={{ height }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={ariaLabel || label || `Progress ${percentage}%`}
        >
          <div
            className="progress-bar-fill"
            style={{
              width: `${percentage}%`,
              backgroundColor: status.color,
              height: '100%',
              transition: 'width 0.3s ease-in-out',
            }}
          >
            {percentage > 20 && (
              <span
                className="progress-bar-text"
                style={{
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  marginLeft: '4px',
                }}
              >
                {percentage}%
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
