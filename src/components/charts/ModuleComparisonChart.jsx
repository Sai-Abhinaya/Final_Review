/**
 * ModuleComparisonChart Component
 * Bar chart comparing completion across all modules
 */

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { getProgressStatus } from '../../utils/dataCalculations.js';

const ModuleComparisonChart = React.memo(({ modules = [] }) => {
  const data = modules.map((module) => ({
    name: module.name,
    completion: module.completion,
    timespent: module.timespent,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: '#fff',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold' }}>{data.name}</p>
          <p style={{ margin: '4px 0', color: '#3b82f6' }}>
            Completion: {data.completion}%
          </p>
          <p style={{ margin: 0, color: '#10b981' }}>
            Time: {data.timespent}h
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container" role="region" aria-label="Module Comparison Chart">
      <h3 className="chart-title">Module Completion Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={190} tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="completion"
            fill="#3b82f6"
            name="Completion %"
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

ModuleComparisonChart.displayName = 'ModuleComparisonChart';

export default ModuleComparisonChart;
