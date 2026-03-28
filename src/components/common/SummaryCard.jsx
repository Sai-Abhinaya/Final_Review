/**
 * SummaryCard Component
 * Reusable card component for displaying metrics
 */

import React from 'react';

const SummaryCard = React.memo(
  ({
    title,
    value,
    unit = '',
    icon = '📊',
    backgroundColor = '#f3f4f6',
    textColor = '#1f2937',
    secondaryValue = null,
    secondaryLabel = '',
    onClick = null,
    isClickable = false,
    ariaLabel,
  }) => {
    return (
      <div
        className={`summary-card ${isClickable ? 'clickable' : ''}`}
        style={{
          backgroundColor,
          cursor: isClickable ? 'pointer' : 'default',
        }}
        onClick={onClick}
        role={isClickable ? 'button' : 'region'}
        tabIndex={isClickable ? 0 : -1}
        onKeyDown={(e) => {
          if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
            onClick?.();
          }
        }}
        aria-label={ariaLabel || title}
      >
        <div className="card-icon">{icon}</div>
        <div className="card-content">
          <h3 className="card-title" style={{ color: textColor }}>
            {title}
          </h3>
          <div className="card-value" style={{ color: textColor }}>
            <span className="value-number">{value}</span>
            {unit && <span className="value-unit">{unit}</span>}
          </div>
          {secondaryValue && (
            <div className="card-secondary">
              <span className="secondary-label">{secondaryLabel}</span>
              <span className="secondary-value">{secondaryValue}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

SummaryCard.displayName = 'SummaryCard';

export default SummaryCard;
