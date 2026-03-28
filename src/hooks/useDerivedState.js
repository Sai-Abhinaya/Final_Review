/**
 * Custom Hook: useDerivedState
 * Computes efficiently memoized derived values from raw data
 * Prevents unnecessary recalculations and re-renders
 */

import { useMemo } from 'react';
import {
  calculateOverallCompletion,
  calculateAverageTime,
  calculateTotalTime,
  getModulesByCategory,
  calculateCategoryStats,
  getRankedModules,
  calculateLearningStreak,
  getPerformanceMetrics,
} from '../utils/dataCalculations.js';

/**
 * Hook to compute derived state values with memoization
 * @param {Array} modules - Module progress data
 * @param {Array} activities - Activity history
 * @param {Object} categoriesMap - Map of categories
 * @param {String} selectedCategory - Currently selected category filter
 * @returns {Object} Memoized derived values
 */
export const useDerivedState = (modules, activities = [], categoriesMap, selectedCategory = null) => {
  // Overall completion metrics
  const overallCompletion = useMemo(
    () => calculateOverallCompletion(modules),
    [modules]
  );

  // Average time per module
  const averageTime = useMemo(
    () => calculateAverageTime(modules),
    [modules]
  );

  // Total time invested
  const totalTime = useMemo(
    () => calculateTotalTime(modules),
    [modules]
  );

  // Filtered modules by selected category
  const filteredModules = useMemo(
    () => getModulesByCategory(modules, selectedCategory),
    [modules, selectedCategory]
  );

  // Category statistics
  const categoryStats = useMemo(
    () => calculateCategoryStats(modules, categoriesMap),
    [modules, categoriesMap]
  );

  // Ranked modules by completion
  const rankedModules = useMemo(
    () => getRankedModules(modules),
    [modules]
  );

  // Learning streak
  const learningStreak = useMemo(
    () => calculateLearningStreak(activities),
    [activities]
  );

  // Comprehensive performance metrics
  const performanceMetrics = useMemo(
    () => getPerformanceMetrics(modules, activities),
    [modules, activities]
  );

  // Calculate filtered modules completion
  const filteredCompletion = useMemo(
    () => calculateOverallCompletion(filteredModules),
    [filteredModules]
  );

  return {
    overallCompletion,
    averageTime,
    totalTime,
    filteredModules,
    categoryStats,
    rankedModules,
    learningStreak,
    performanceMetrics,
    filteredCompletion,
  };
};
