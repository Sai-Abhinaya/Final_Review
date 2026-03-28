import { useState, useCallback, useEffect } from 'react';
import {
  generateMockProgressData,
  generateTrendData,
  generateActivityHistory,
} from '../utils/mockData.js';

export const useProgressData = () => {
  const [modules, setModules] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    setModules(generateMockProgressData());
    setTrendData(generateTrendData());
    setActivities(generateActivityHistory());
    setLastUpdated(new Date());
    setIsLoading(false);
  }, []);

  // ✅ MAIN FIX (NO NaN)
  const updateModuleActivities = useCallback((moduleId, updatedActivities) => {
    setModules((prevModules) =>
      prevModules.map((module) => {
        if (module.id !== moduleId) return module;

        const total = updatedActivities ? updatedActivities.length : 0;
        const completedCount = updatedActivities
          ? updatedActivities.filter((a) => a.completed).length
          : 0;

        const completion =
          total === 0 ? 0 : Math.round((completedCount / total) * 100);

        return {
          ...module,
          activities: updatedActivities || [],
          completion,
        };
      })
    );

    setLastUpdated(new Date());
  }, []);

  const addModuleTime = useCallback((moduleId, additionalTime) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              timespent: (module.timespent || 0) + additionalTime,
            }
          : module
      )
    );
  }, []);

  return {
    modules,
    trendData,
    activities,
    isLoading,
    lastUpdated,
    updateModuleActivities, // 👈 IMPORTANT
    addModuleTime,
  };
};

