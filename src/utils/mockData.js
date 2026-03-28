import { MODULES } from './constants.js';

const convertActivities = (activities) =>
  activities.map((a) => ({
    ...a,
    completion: 0,
    completed: false,
  }));

export const generateMockProgressData = () => [
  {
    ...MODULES.REACT,
    completion: 0,
    timespent: 0,
    lastUpdated: new Date(),
    activities: convertActivities([
      { id: 'a1', name: 'Hooks Introduction' },
      { id: 'a2', name: 'State Management' },
      { id: 'a3', name: 'Context API' },
      { id: 'a4', name: 'Custom Hooks' },
    ]),
  },
  {
    ...MODULES.JAVASCRIPT,
    completion: 0,
    timespent: 0,
    lastUpdated: new Date(),
    activities: convertActivities([
      { id: 'a5', name: 'ES6 Syntax' },
      { id: 'a6', name: 'Promises & Async' },
      { id: 'a7', name: 'Closures' },
      { id: 'a8', name: 'Prototypes' },
    ]),
  },
  {
    ...MODULES.CSS,
    completion: 0,
    timespent: 0,
    lastUpdated: new Date(),
    activities: convertActivities([
      { id: 'a9', name: 'Flexbox' },
      { id: 'a10', name: 'Grid Layout' },
      { id: 'a11', name: 'Responsive Design' },
      { id: 'a12', name: 'CSS Animations' },
    ]),
  },
  {
    ...MODULES.NODEJS,
    completion: 0,
    timespent: 0,
    lastUpdated: new Date(),
    activities: convertActivities([
      { id: 'a13', name: 'Express Basics' },
      { id: 'a14', name: 'Middleware' },
      { id: 'a15', name: 'Routing' },
      { id: 'a16', name: 'Authentication' },
    ]),
  },
  {
    ...MODULES.DATABASE,
    completion: 0,
    timespent: 0,
    lastUpdated: new Date(),
    activities: convertActivities([
      { id: 'a17', name: 'SQL Basics' },
      { id: 'a18', name: 'Joins & Queries' },
      { id: 'a19', name: 'Indexes' },
      { id: 'a20', name: 'Optimization' },
    ]),
  },
  {
    ...MODULES.DOCKER,
    completion: 0,
    timespent: 0,
    lastUpdated: new Date(),
    activities: convertActivities([
      { id: 'a21', name: 'Docker Intro' },
      { id: 'a22', name: 'Images & Containers' },
      { id: 'a23', name: 'Docker Compose' },
      { id: 'a24', name: 'Orchestration' },
    ]),
  },
];

export const syncModuleCompletion = (module) => {
  const total = module.activities.length;

  const updatedActivities = module.activities.map((a) => ({
    ...a,
    completion: a.completed ? 100 : 0,
  }));

  const completedCount = updatedActivities.filter((a) => a.completed).length;

  return {
    ...module,
    activities: updatedActivities,
    completion: total === 0 ? 0 : Math.round((completedCount / total) * 100),
  };
};

export const generateTrendData = () => {
  return [];
};

export const generateActivityHistory = () => {
  return [];
};
