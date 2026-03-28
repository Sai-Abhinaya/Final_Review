/**
 * Analytics Page
 * Comprehensive charts and analytics visualizations
 */

import React, { lazy, Suspense } from 'react';
import ModuleComparisonChart from '../components/charts/ModuleComparisonChart.jsx';
import CompletionTrendChart from '../components/charts/CompletionTrendChart.jsx';
import DetailedAnalyticsChart from '../components/charts/DetailedAnalyticsChart.jsx';
import LoadingIndicator from '../components/common/LoadingIndicator.jsx';
import SummaryCard from '../components/common/SummaryCard.jsx';
import { useDerivedState } from '../hooks/useDerivedState.js';
import { LEARNING_CATEGORIES } from '../utils/constants.js';

const AnalyticsPage = React.memo(({ modules, trendData, activities, isLoading }) => {
  const derivedState = useDerivedState(modules, activities, LEARNING_CATEGORIES);

  return (
    <div className="page-container analytics-page">
      <LoadingIndicator isLoading={isLoading} message="Loading analytics..." />

      <h1 className="page-title">Learning Analytics</h1>

      {/* Key Metrics Summary */}
      <section className="analytics-section">
        <h2 className="section-title">Performance Metrics</h2>
        <div className="cards-grid">
          <SummaryCard
            title="Overall Completion"
            value={derivedState.performanceMetrics.overallCompletion}
            unit="%"
            icon="🎯"
            backgroundColor="#dbeafe"
            textColor="#1e40af"
            ariaLabel={`Overall completion: ${derivedState.performanceMetrics.overallCompletion}%`}
          />
          <SummaryCard
            title="Total Hours"
            value={derivedState.performanceMetrics.totalTimeInvested}
            unit="h"
            icon="⏱️"
            backgroundColor="#fef08a"
            textColor="#854d0e"
            ariaLabel={`Total hours invested: ${derivedState.performanceMetrics.totalTimeInvested}`}
          />
          <SummaryCard
            title="Avg Time/Module"
            value={derivedState.performanceMetrics.averageTimePerModule}
            unit="h"
            icon="📊"
            backgroundColor="#e0e7ff"
            textColor="#3730a3"
            ariaLabel={`Average time per module: ${derivedState.performanceMetrics.averageTimePerModule}h`}
          />
          <SummaryCard
            title="Learning Streak"
            value={derivedState.performanceMetrics.learningStreak}
            unit="days"
            icon="🔥"
            backgroundColor="#fee2e2"
            textColor="#991b1b"
            ariaLabel={`Current learning streak: ${derivedState.performanceMetrics.learningStreak} days`}
          />
        </div>
      </section>

      {/* Charts Grid */}
      <section className="analytics-section charts-section">
        <Suspense fallback={<LoadingIndicator isLoading={true} />}>
          <div className="charts-grid">
            {/* Module Comparison Chart */}
            <div className="chart-wrapper">
              <ModuleComparisonChart modules={modules} />
            </div>

            {/* Completion Trend Chart */}
            <div className="chart-wrapper">
              <CompletionTrendChart trendData={trendData} />
            </div>

            {/* Category Analytics Chart */}
            <div className="chart-wrapper full-width">
              <DetailedAnalyticsChart categoryStats={derivedState.categoryStats} />
            </div>
          </div>
        </Suspense>
      </section>

      {/* Activity Insights */}
      <section className="analytics-section">
        <h2 className="section-title">Recent Activities</h2>
        {activities && activities.length > 0 ? (
          <div className="activities-timeline">
            {activities.slice(0, 8).map((activity) => {
              const module = modules.find((m) => m.id === activity.moduleId);
              return (
                <div
                  key={activity.id}
                  className="timeline-item"
                  role="listitem"
                  aria-label={`${activity.type} on ${module?.name || 'unknown module'}`}
                >
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <p className="timeline-title">
                      <strong>{activity.type}</strong>{' '}
                      <span className="timeline-module">{module?.name}</span>
                    </p>
                    <p className="timeline-time">
                      {new Date(activity.timestamp).toLocaleDateString()} ·{' '}
                      {activity.duration}h
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="empty-state">No activities recorded yet.</p>
        )}
      </section>
    </div>
  );
});

AnalyticsPage.displayName = 'AnalyticsPage';

export default AnalyticsPage;
