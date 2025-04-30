import React, { useState, useEffect } from 'react';
import { useWorkout } from '../context/WorkoutContext';

const Settings = () => {
  const { settings, updateSettings, personalInfo, updatePersonalInfo } = useWorkout();
  const [localPersonalInfo, setLocalPersonalInfo] = useState(personalInfo);
  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setLocalPersonalInfo(personalInfo);
  }, [personalInfo]);

  const handleToggle = (key) => {
    updateSettings({ [key]: !settings[key] });
  };

  const handleUnitChange = (e) => {
    updateSettings({ units: e.target.value });
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setLocalPersonalInfo(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!localPersonalInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!localPersonalInfo.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(localPersonalInfo.age) || localPersonalInfo.age < 1 || localPersonalInfo.age > 120) {
      newErrors.age = 'Please enter a valid age (1-120)';
    }
    if (!localPersonalInfo.height) {
      newErrors.height = 'Height is required';
    } else if (isNaN(localPersonalInfo.height) || localPersonalInfo.height <= 0) {
      newErrors.height = 'Please enter a valid height';
    }
    if (!localPersonalInfo.weight) {
      newErrors.weight = 'Weight is required';
    } else if (isNaN(localPersonalInfo.weight) || localPersonalInfo.weight <= 0) {
      newErrors.weight = 'Please enter a valid weight';
    }
    if (!localPersonalInfo.fitnessGoal) {
      newErrors.fitnessGoal = 'Please select a fitness goal';
    }
    return newErrors;
  };

  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSaving(true);
    updatePersonalInfo(localPersonalInfo);
    setSaveSuccess(true);
    setIsSaving(false);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Settings
      </h1>

      {showSuccess && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg">
          <p className="text-lg font-semibold">Welcome to FitTrack, {localPersonalInfo.name}!</p>
          <p className="text-sm mt-1">Your personal information has been saved successfully.</p>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Personal Information
          </h2>
          
          <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={localPersonalInfo.name}
                onChange={handlePersonalInfoChange}
                className={`w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 ${
                  errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={localPersonalInfo.age}
                onChange={handlePersonalInfoChange}
                className={`w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 ${
                  errors.age ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder="Enter your age"
                min="1"
                max="120"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Height ({settings.units === 'metric' ? 'cm' : 'ft'})
              </label>
              <input
                type="number"
                name="height"
                value={localPersonalInfo.height}
                onChange={handlePersonalInfoChange}
                className={`w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 ${
                  errors.height ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder={`Enter your height in ${settings.units === 'metric' ? 'cm' : 'ft'}`}
                min="0"
                step="0.01"
              />
              {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Weight ({settings.units === 'metric' ? 'kg' : 'lbs'})
              </label>
              <input
                type="number"
                name="weight"
                value={localPersonalInfo.weight}
                onChange={handlePersonalInfoChange}
                className={`w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 ${
                  errors.weight ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
                placeholder={`Enter your weight in ${settings.units === 'metric' ? 'kg' : 'lbs'}`}
                min="0"
                step="0.1"
              />
              {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Fitness Goal
              </label>
              <select
                name="fitnessGoal"
                value={localPersonalInfo.fitnessGoal}
                onChange={handlePersonalInfoChange}
                className={`w-full p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 ${
                  errors.fitnessGoal ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select a goal</option>
                <option value="weight-loss">Weight Loss</option>
                <option value="muscle-gain">Muscle Gain</option>
                <option value="endurance">Endurance</option>
                <option value="flexibility">Flexibility</option>
              </select>
              {errors.fitnessGoal && <p className="text-red-500 text-sm mt-1">{errors.fitnessGoal}</p>}
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Personal Information'}
            </button>

            {saveSuccess && (
              <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg text-center">
                Personal information saved successfully!
              </div>
            )}
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Appearance
          </h2>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <button
              onClick={() => handleToggle('darkMode')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Preferences
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 dark:text-gray-300">Daily Reminder</span>
              <button
                onClick={() => handleToggle('dailyReminder')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.dailyReminder ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.dailyReminder ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Measurement Units
              </label>
              <select
                value={settings.units}
                onChange={handleUnitChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <option value="metric">Metric (kg, km, m)</option>
                <option value="imperial">Imperial (lbs, miles, ft)</option>
                <option value="custom">Custom (kg, miles)</option>
                <option value="scientific">Scientific (g, m)</option>
              </select>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 dark:text-gray-300">Show Workout History</span>
              <button
                onClick={() => handleToggle('showHistory')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.showHistory ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.showHistory ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Auto-save Workouts</span>
              <button
                onClick={() => handleToggle('autoSave')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoSave ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            About
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            FitTrack v1.0.0
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            A simple and effective way to track your fitness journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings; 
