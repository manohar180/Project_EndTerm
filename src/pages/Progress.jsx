import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';

const Progress = () => {
  const { workouts } = useWorkout();
  const [filter, setFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');

  const getFilteredWorkouts = () => {
    let filtered = workouts;

    if (filter !== 'all') {
      filtered = filtered.filter(workout => workout.type === filter);
    }

    const now = new Date();
    switch (timeFilter) {
      case 'week':
        filtered = filtered.filter(workout => {
          const workoutDate = new Date(workout.date);
          const diffTime = Math.abs(now - workoutDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 7;
        });
        break;
      case 'month':
        filtered = filtered.filter(workout => {
          const workoutDate = new Date(workout.date);
          const diffTime = Math.abs(now - workoutDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 30;
        });
        break;
      case 'year':
        filtered = filtered.filter(workout => {
          const workoutDate = new Date(workout.date);
          const diffTime = Math.abs(now - workoutDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 365;
        });
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredWorkouts = getFilteredWorkouts();
  const totalDuration = filteredWorkouts.reduce((sum, workout) => sum + Number(workout.duration), 0);
  const workoutTypes = [...new Set(workouts.map(w => w.type))];

  const getWorkoutStats = (type) => {
    const typeWorkouts = filteredWorkouts.filter(w => w.type === type);
    const total = typeWorkouts.reduce((sum, w) => sum + Number(w.duration), 0);
    return {
      count: typeWorkouts.length,
      totalDuration: total,
      percentage: (total / totalDuration) * 100 || 0
    };
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
        Your Progress
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Workout Type
          </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option value="all">All Workouts</option>
            {workoutTypes.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Time Period
          </label>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Total Workouts
          </h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            {filteredWorkouts.length}
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Total Duration
          </h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            {totalDuration} minutes
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Average Duration
          </h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            {filteredWorkouts.length ? Math.round(totalDuration / filteredWorkouts.length) : 0} minutes
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {workoutTypes.map(type => {
          const stats = getWorkoutStats(type);
          return (
            <div key={type} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </h3>
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  {stats.count} workouts
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-teal-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${stats.percentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Total: {stats.totalDuration} minutes</span>
                <span>{Math.round(stats.percentage)}% of total</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Progress; 
