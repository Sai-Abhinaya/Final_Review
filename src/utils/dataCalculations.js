/**
 * Data Calculations Utility
 * Pure functions for deriving state from raw progress data
 * This avoids redundant state and ensures efficient memoization
 */

/**
 * Calculate overall completion percentage across all modules
 * @param {Array} modules - Array of module objects with completion property
 * @returns {Number} Overall completion percentage (0-100)
 */
export const calculateOverallCompletion = (modules) => {
  if (!modules || modules.length === 0) return 0;

  const totalCompletion = modules.reduce((sum, module) => sum + (module.completion || 0), 0);
  return Math.round(totalCompletion / modules.length);
};

/**
 * Calculate average learning time spent across all modules
 * @param {Array} modules - Array of module objects with timespent property
 * @returns {Number} Average time spent in hours
 */
export const calculateAverageTime = (modules) => {
  if (!modules || modules.length === 0) return 0;

  const totalTime = modules.reduce((sum, module) => sum + (module.timespent || 0), 0);
  return Math.round((totalTime / modules.length) * 10) / 10;
};

/**
 * Calculate total time spent across all modules
 * @param {Array} modules - Array of module objects with timespent property
 * @returns {Number} Total time spent in hours
 */
export const calculateTotalTime = (modules) => {
  if (!modules || modules.length === 0) return 0;
  return modules.reduce((sum, module) => sum + (module.timespent || 0), 0);
};

/**
 * Get modules filtered by category
 * @param {Array} modules - Array of module objects
 * @param {String} category - Category to filter by
 * @returns {Array} Filtered modules
 */
export const getModulesByCategory = (modules, category) => {
  if (!category) return modules;
  return modules.filter((module) => module.category === category);
};

/**
 * Calculate category-wise statistics
 * @param {Array} modules - Array of module objects
 * @param {Object} categoriesMap - Map of category names
 * @returns {Array} Array of category statistics
 */
export const calculateCategoryStats = (modules, categoriesMap) => {
  const stats = {};

  Object.values(categoriesMap).forEach((category) => {
    const categoryModules = getModulesByCategory(modules, category);
    const completion = calculateOverallCompletion(categoryModules);
    const timeSpent = calculateTotalTime(categoryModules);

    stats[category] = {
      name: category,
      completion,
      timeSpent,
      modulesCount: categoryModules.length,
      modules: categoryModules,
    };
  });

  return Object.values(stats);
};

/**
 * Calculate progress status based on completion percentage
 * @param {Number} completion - Completion percentage
 * @returns {Object} Status object with label and color
 */
export const getProgressStatus = (completion) => {
  if (completion === 100) {
    return { label: 'Completed', color: '#10b981', bgColor: '#d1fae5' };
  }
  if (completion >= 75) {
    return { label: 'Substantial', color: '#06b6d4', bgColor: '#cffafe' };
  }
  if (completion >= 50) {
    return { label: 'Partial', color: '#f59e0b', bgColor: '#fef3c7' };
  }
  return { label: 'In Progress', color: '#ef4444', bgColor: '#fee2e2' };
};

/**
 * Calculate module ranking based on completion percentage
 * @param {Array} modules - Array of module objects
 * @returns {Array} Sorted modules array by completion (descending)
 */
export const getRankedModules = (modules) => {
  return [...modules].sort((a, b) => (b.completion || 0) - (a.completion || 0));
};

/**
 * Calculate learning streak (consecutive days of learning)
 * @param {Array} activities - Array of activity records
 * @returns {Number} Current streak in days
 */
export const calculateLearningStreak = (activities) => {
  if (!activities || activities.length === 0) return 0;

  const sortedActivities = [...activities].sort((a, b) => b.timestamp - a.timestamp);

  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const activity of sortedActivities) {
    const activityDate = new Date(activity.timestamp);
    activityDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((currentDate - activityDate) / (1000 * 60 * 60 * 24));

    if (daysDiff === streak) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (daysDiff > streak) {
      break;
    }
  }

  return streak;
};

/**
 * Get most active module based on time spent
 * @param {Array} modules - Array of module objects
 * @returns {Object} Most active module or null
 */
export const getMostActiveModule = (modules) => {
  if (!modules || modules.length === 0) return null;
  return modules.reduce((max, module) => 
    (module.timespent > (max.timespent || 0)) ? module : max
  );
};

/**
 * Calculate estimated completion time for a module
 * @param {Number} currentCompletion - Current completion percentage
 * @param {Number} timeSpent - Time already spent in hours
 * @returns {Number} Estimated hours remaining to complete (rough estimate)
 */
export const estimateRemainingTime = (currentCompletion, timeSpent) => {
  if (currentCompletion === 0 || timeSpent === 0) return 0;

  const rate = (currentCompletion / 100) / timeSpent;
  const remainingCompletion = 100 - currentCompletion;
  return Math.round((remainingCompletion / rate) * 10) / 10;
};

/**
 * Get performance metrics summary
 * @param {Array} modules - Array of module objects
 * @param {Array} activities - Array of activity records
 * @returns {Object} Comprehensive metrics summary
 */
export const getPerformanceMetrics = (modules, activities = []) => {
  return {
    overallCompletion: calculateOverallCompletion(modules),
    averageTimePerModule: calculateAverageTime(modules),
    totalTimeInvested: calculateTotalTime(modules),
    learningStreak: calculateLearningStreak(activities),
    moduleCount: modules.length,
    completedModules: modules.filter((m) => m.completion === 100).length,
    mostActive: getMostActiveModule(modules),
  };
};
