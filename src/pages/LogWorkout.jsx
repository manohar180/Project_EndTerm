import React, { useState, useEffect } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { useNavigate, useLocation } from 'react-router-dom';

const LogWorkout = () => {
  const { addWorkout } = useWorkout();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    type: '',
    subType: '',
    duration: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    intensity: 'medium',
    sets: '',
    reps: '',
    weight: '',
    distance: '',
    heartRate: '',
    calories: '',
    template: false
  });

  // Timer state
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => {
    setIsRunning(true);
    setTimerStarted(true);
  };

  const handlePauseTimer = () => {
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setTimerStarted(false);
  };

  useEffect(() => {
    // Get workout type from URL parameters
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type) {
      setFormData(prev => ({
        ...prev,
        type: type.charAt(0).toUpperCase() + type.slice(1)
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addWorkout(formData);
    setFormData({
      type: '',
      subType: '',
      duration: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      intensity: 'medium',
      sets: '',
      reps: '',
      weight: '',
      distance: '',
      heartRate: '',
      calories: '',
      template: false
    });
  };

  const workoutTemplates = [
    { 
      name: 'Quick Cardio', 
      type: 'Running',
      duration: 30, 
      intensity: 'high',
      distance: 5,
      heartRate: 150
    },
    { 
      name: 'Full Body Strength', 
      type: 'Weightlifting',
      duration: 45, 
      intensity: 'medium',
      sets: 3,
      reps: 12,
      weight: 20
    },
    { 
      name: 'Morning Yoga', 
      type: 'Yoga',
      duration: 20, 
      intensity: 'low'
    }
  ];

  const applyTemplate = (template) => {
    setFormData(prev => ({
      ...prev,
      type: template.type,
      duration: template.duration,
      intensity: template.intensity,
      distance: template.distance || '',
      heartRate: template.heartRate || '',
      sets: template.sets || '',
      reps: template.reps || '',
      weight: template.weight || '',
      template: true
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
        Log Workout
      </h1>

      {/* Timer Section */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {formatTime(time)}
          </div>
          <div className="flex justify-center gap-4">
            {!timerStarted ? (
              <button
                onClick={handleStartTimer}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Start Timer
              </button>
            ) : (
              <>
                <button
                  onClick={handlePauseTimer}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Pause
                </button>
                <button
                  onClick={handleResetTimer}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reset
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick Templates */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Quick Templates
        </h2>
        <div className="flex flex-wrap gap-4">
          {workoutTemplates.map((template, index) => (
            <button
              key={index}
              onClick={() => applyTemplate(template)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Workout Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            >
              <option value="">Select a workout type</option>
              <optgroup label="Cardio" className="dark:text-gray-200">
                <option value="Running">Running</option>
                <option value="Cycling">Cycling</option>
                <option value="Swimming">Swimming</option>
                <option value="HIIT">HIIT</option>
              </optgroup>
              <optgroup label="Strength" className="dark:text-gray-200">
                <option value="Weightlifting">Weightlifting</option>
                <option value="Bodyweight">Bodyweight</option>
                <option value="CrossFit">CrossFit</option>
              </optgroup>
              <optgroup label="Flexibility" className="dark:text-gray-200">
                <option value="Yoga">Yoga</option>
                <option value="Pilates">Pilates</option>
                <option value="Stretching">Stretching</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label htmlFor="intensity" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Intensity Level
            </label>
            <select
              id="intensity"
              name="intensity"
              value={formData.intensity}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              min="1"
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            />
          </div>
        </div>

        {/* Strength Training Fields */}
        {(formData.type === 'Weightlifting' || formData.type === 'Bodyweight' || formData.type === 'CrossFit') && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="sets" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Sets
              </label>
              <input
                type="number"
                id="sets"
                name="sets"
                value={formData.sets}
                onChange={handleChange}
                min="1"
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <label htmlFor="reps" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Reps per Set
              </label>
              <input
                type="number"
                id="reps"
                name="reps"
                value={formData.reps}
                onChange={handleChange}
                min="1"
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>
          </div>
        )}

        {/* Cardio Fields */}
        {(formData.type === 'Running' || formData.type === 'Cycling' || formData.type === 'Swimming') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="distance" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Distance (km)
              </label>
              <input
                type="number"
                id="distance"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>
            <div>
              <label htmlFor="heartRate" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Average Heart Rate (bpm)
              </label>
              <input
                type="number"
                id="heartRate"
                name="heartRate"
                value={formData.heartRate}
                onChange={handleChange}
                min="0"
                className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="calories" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Calories Burned
          </label>
          <input
            type="number"
            id="calories"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            min="0"
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            placeholder="Add any additional notes about your workout..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Log Workout
          </button>
          <button
            type="button"
            onClick={() => setFormData({
              type: '',
              subType: '',
              duration: '',
              date: new Date().toISOString().split('T')[0],
              notes: '',
              intensity: 'medium',
              sets: '',
              reps: '',
              weight: '',
              distance: '',
              heartRate: '',
              calories: '',
              template: false
            })}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default LogWorkout; 