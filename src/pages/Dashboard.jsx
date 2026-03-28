/**
 * Dashboard Page
 * Overall learning progress summary with key metrics
 */

import React, { useMemo } from 'react';
import ProgressBar from '../components/common/ProgressBar.jsx';
import SummaryCard from '../components/common/SummaryCard.jsx';
import LoadingIndicator from '../components/common/LoadingIndicator.jsx';
import { useDerivedState } from '../hooks/useDerivedState.js';
import { LEARNING_CATEGORIES } from '../utils/constants.js';

const Dashboard = React.memo(({ modules, activities, isLoading }) => {
  const derivedState = useDerivedState(modules, activities, LEARNING_CATEGORIES);

  // Memoized layout data
  const layoutData = useMemo(
    () => [
      {
        title: 'Overall Progress',
        value: derivedState.overallCompletion,
        unit: '%',
        icon: '🎯',
        backgroundColor: '#dbeafe',
        textColor: '#1e40af',
      },
      {
        title: 'Modules Completed',
        value: derivedState.performanceMetrics.completedModules,
        unit: `/${derivedState.performanceMetrics.moduleCount}`,
        icon: '✅',
        backgroundColor: '#dcfce7',
        textColor: '#15803d',
      },
      {
        title: 'Hours Invested',
        value: derivedState.performanceMetrics.totalTimeInvested,
        unit: 'h',
        icon: '⏱️',
        backgroundColor: '#fef08a',
        textColor: '#854d0e',
      },
      {
        title: 'Learning Streak',
        value: derivedState.learningStreak,
        unit: 'days',
        icon: '🔥',
        backgroundColor: '#fee2e2',
        textColor: '#991b1b',
      },
    ],
    [derivedState]
  );

  return (
    <div className="page-container dashboard-page">
      <LoadingIndicator isLoading={isLoading} message="Updating data..." />

      <section className="dashboard-section">
        <h2 className="section-title">Your Learning Journey</h2>

        {/* Summary Cards Grid */}
        <div className="cards-grid">
          {layoutData.map((card, index) => (
            <SummaryCard
              key={index}
              title={card.title}
              value={card.value}
              unit={card.unit}
              icon={card.icon}
              backgroundColor={card.backgroundColor}
              textColor={card.textColor}
              ariaLabel={`${card.title}: ${card.value}${card.unit}`}
            />
          ))}
        </div>
      </section>

      {/* Overall Progress Section */}
      <section className="dashboard-section">
        <h2 className="section-title">Overall Completion</h2>
        <div className="progress-section">
          <ProgressBar
            percentage={derivedState.overallCompletion}
            label="All Modules"
            height="12px"
            ariaLabel="Overall learning completion across all modules"
            fullWidth
          />
          <div className="progress-stats">
            <p>
              <strong>Next Goal:</strong> {100 - derivedState.overallCompletion}% remaining
            </p>
            <p>
              <strong>Average Time Per Module:</strong> {derivedState.averageTime} hours
            </p>
          </div>
        </div>
      </section>

      {/* Top Performers */}
      <section className="dashboard-section">
        <h2 className="section-title">Top Learning Modules</h2>
        <div className="modules-list">
          {derivedState.rankedModules.slice(0, 5).map((module, index) => (
            <div key={module.id} className="module-item">
              <span className="rank-badge">{index + 1}</span>
              <div className="module-info">
                <h4>{module.name}</h4>
                <p className="module-category">{module.category}</p>
              </div>
              <ProgressBar
                percentage={module.completion}
                showLabel={false}
                showStatus={false}
                height="6px"
                ariaLabel={`${module.name} completion: ${module.completion}%`}
              />
              <span className="module-completion">{module.completion}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="dashboard-section">
        <h2 className="section-title">Category Breakdown</h2>
        <div className="categories-grid">
          {derivedState.categoryStats.map((stat) => (
            <div key={stat.name} className="category-card">
              <h4>{stat.name}</h4>
              <div className="category-stat">
                <span className="stat-label">Completion</span>
                <span className="stat-value">{stat.completion}%</span>
              </div>
              <div className="category-stat">
                <span className="stat-label">Time Spent</span>
                <span className="stat-value">{stat.timeSpent}h</span>
              </div>
              <div className="category-stat">
                <span className="stat-label">Modules</span>
                <span className="stat-value">{stat.modulesCount}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
