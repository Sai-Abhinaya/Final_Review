/**
 * DetailedAnalyticsChart Component
 * Category-wise completion and time spent visualization (Pie & Bar)
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

const DetailedAnalyticsChart = React.memo(({ categoryStats = [] }) => {
  const data = categoryStats.map((stat) => ({
    name: stat.name,
    completion: Math.round(stat.completion),
    'Time Spent (hours)': stat.timeSpent,
  }));

  const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

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
            Time: {data['Time Spent (hours)']}h
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container" role="region" aria-label="Category Analytics Chart">
      <h3 className="chart-title">Category-wise Analytics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" label={{ value: 'Completion %', angle: -90, position: 'insideLeft' }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: 'Time (hours)', angle: 90, position: 'insideRight' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar yAxisId="left" dataKey="completion" fill="#3b82f6" name="Completion %" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
          <Bar
            yAxisId="right"
            dataKey="Time Spent (hours)"
            fill="#8b5cf6"
            name="Time Spent (hours)"
            radius={[8, 8, 0, 0]}
            opacity={0.7}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                opacity={0.5}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

DetailedAnalyticsChart.displayName = 'DetailedAnalyticsChart';

export default DetailedAnalyticsChart;
