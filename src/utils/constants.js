/**
 * Application Constants
 * Centralized constants for categories, modules, and application settings
 */

export const LEARNING_CATEGORIES = {
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  DATABASE: 'Database',
  DEVOPS: 'DevOps',
};

export const MODULES = {
  REACT: {
    id: 'react',
    name: 'React Fundamentals',
    category: LEARNING_CATEGORIES.FRONTEND,
    description: 'Learn core React concepts and hooks',
  },
  JAVASCRIPT: {
    id: 'javascript',
    name: 'Advanced JavaScript',
    category: LEARNING_CATEGORIES.FRONTEND,
    description: 'Master ES6+ features and async patterns',
  },
  CSS: {
    id: 'css',
    name: 'CSS Advanced',
    category: LEARNING_CATEGORIES.FRONTEND,
    description: 'Responsive design and CSS frameworks',
  },
  NODEJS: {
    id: 'nodejs',
    name: 'Node.js & Express',
    category: LEARNING_CATEGORIES.BACKEND,
    description: 'Server-side development with Node.js',
  },
  DATABASE: {
    id: 'database',
    name: 'SQL & Databases',
    category: LEARNING_CATEGORIES.DATABASE,
    description: 'Database design and SQL queries',
  },
  DOCKER: {
    id: 'docker',
    name: 'Docker & Containers',
    category: LEARNING_CATEGORIES.DEVOPS,
    description: 'Containerization and deployment',
  },
};

export const ROUTE_PATHS = {
  DASHBOARD: '/',
  MODULES: '/modules',
  ANALYTICS: '/analytics',
  LOGIN: '/login',
  PROFILE: '/profile',
};

export const COLOR_PALETTE = {
  PRIMARY: '#3b82f6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4',
  LIGHT: '#f3f4f6',
  DARK: '#1f2937',
  SECONDARY: '#8b5cf6',
};

export const PROGRESS_THRESHOLDS = {
  INCOMPLETE: 25,
  PARTIAL: 50,
  SUBSTANTIAL: 75,
  COMPLETE: 100,
};
