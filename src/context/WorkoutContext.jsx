import React, { createContext, useState, useContext, useEffect } from 'react';

const WorkoutContext = createContext();

export const useWorkout = () => useContext(WorkoutContext);

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [settings, setSettings] = useState({
    darkMode: true,
    dailyReminder: true,
    units: 'metric',
    showHistory: true,
    autoSave: true
  });
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    fitnessGoal: 'maintenance'
  });

  useEffect(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    const savedSettings = localStorage.getItem('settings');
    const savedPersonalInfo = localStorage.getItem('personalInfo');
    
    if (savedWorkouts) setWorkouts(JSON.parse(savedWorkouts));
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      if (parsedSettings.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      document.documentElement.classList.add('dark');
    }
    if (savedPersonalInfo) {
      setPersonalInfo(JSON.parse(savedPersonalInfo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
  }, [personalInfo]);

  const addWorkout = (workout) => {
    setWorkouts([...workouts, { ...workout, id: Date.now(), date: new Date().toISOString() }]);
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updatePersonalInfo = (newInfo) => {
    setPersonalInfo(prev => ({ ...prev, ...newInfo }));
  };

  const value = {
    workouts,
    addWorkout,
    settings,
    updateSettings,
    personalInfo,
    updatePersonalInfo
  };

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  );
}; 
