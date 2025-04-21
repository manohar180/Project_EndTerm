import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useWorkout } from '../context/WorkoutContext';
import { weatherService } from '../services/weatherService';

const Home = () => {
  const { personalInfo } = useWorkout();
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get('https://api.quotable.io/random?tags=fitness');
        setQuote(response.data);
      } catch (error) {
        console.error('Error fetching quote:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchWeather = async () => {
      try {
        setWeatherLoading(true);
        setWeatherError('');
        console.log('Fetching weather data...');
        const data = await weatherService.getCurrentWeather();
        console.log('Weather data received:', data);
        setWeather(data);
      } catch (error) {
        console.error('Error in fetchWeather:', error);
        setWeatherError(`Error: ${error.message}. Please check your API key and try again.`);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchQuote();
    fetchWeather();
  }, []);

  const motivationalQuote = {
    content: "The only bad workout is the one that didn't happen.",
    author: "Arnold Schwarzenegger"
  };

  const exerciseSuggestion = weather ? weatherService.getExerciseSuggestion(weather.main.temp) : null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center mb-8">
        {personalInfo.name && (
          <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Hi, {personalInfo.name}!
          </h2>
        )}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Welcome to FitTrack
        </h1>
      </div>

      {weatherLoading && (
        <div className="max-w-2xl mx-auto mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex justify-center">
            <div className="rounded-full h-8 w-8 border-b-2 border-blue-500 animate-spin"></div>
          </div>
        </div>
      )}

      {!weatherLoading && weatherError && (
        <div className="max-w-2xl mx-auto mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="text-center">
            <p className="text-red-500 dark:text-red-400 mb-2">{weatherError}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Make sure your OpenWeatherMap API key is valid and active.
            </p>
            <button 
              onClick={() => {
                setWeatherLoading(true);
                setWeatherError('');
                weatherService.getCurrentWeather()
                  .then(data => {
                    setWeather(data);
                    setWeatherLoading(false);
                  })
                  .catch(error => {
                    console.error('Error retrying weather fetch:', error);
                    setWeatherError(`Error: ${error.message}. Please check your API key and try again.`);
                    setWeatherLoading(false);
                  });
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {!weatherLoading && !weatherError && weather && (
        <div className="max-w-2xl mx-auto mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Current Weather
            </h2>
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="text-4xl font-bold text-gray-700 dark:text-gray-300">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {weather.weather[0].description}
              </div>
            </div>
            {exerciseSuggestion && (
              <div className="mt-4">
                <p className="text-lg text-blue-600 dark:text-blue-400 mb-2">
                  {exerciseSuggestion.suggestion}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {exerciseSuggestion.exercises.map((exercise, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {exercise}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transform hover:scale-105 transition-all duration-300">
        {loading ? (
          <div className="flex justify-center">
            <div className="rounded-full h-8 w-8 border-b-2 border-blue-500 animate-spin"></div>
          </div>
        ) : (
          <div className="text-center">
            {quote && (
              <>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
                  "{quote.content}"
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  - {quote.author}
                </p>
              </>
            )}
            <p className="text-lg text-blue-600 dark:text-blue-400 italic">
              "{motivationalQuote.content}"
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              - {motivationalQuote.author}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          to="/log-workout" 
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-md transform hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold mb-4">Log Workout</h2>
          <p className="text-blue-100">Track your daily fitness activities and progress</p>
        </Link>

        <Link 
          to="/progress" 
          className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-xl p-6 shadow-md transform hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold mb-4">View Progress</h2>
          <p className="text-teal-100">See your fitness journey and achievements</p>
        </Link>

        <Link 
          to="/settings" 
          className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-6 shadow-md transform hover:scale-105 hover:shadow-lg transition-all duration-300"
        >
          <h2 className="text-2xl font-semibold mb-4">Settings</h2>
          <p className="text-indigo-100">Customize your FitTrack experience</p>
        </Link>
      </div>

      {/* Popular Workouts Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Popular Workouts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularWorkouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white">{workout.name}</h3>
                  <p className="text-gray-200 text-sm">{workout.category}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {workout.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {workout.duration} min
                  </span>
                  <button
                    onClick={() => navigate(`/log-workout?type=${workout.category.toLowerCase()}`)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold"
                  >
                    Do it →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fitness Goals Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Fitness Goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fitnessGoals.map((goal) => (
            <div
              key={goal.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  {goal.name}
                </h3>
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Recommended Exercises:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                    {goal.exercises.map((exercise, index) => (
                      <li key={index}>{exercise}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Food Suggestions:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                    {goal.foods.map((food, index) => (
                      <li key={index}>{food}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const popularWorkouts = [
  {
    id: 1,
    name: 'Full Body HIIT',
    category: 'Cardio',
    description: 'High-intensity interval training for total body workout',
    duration: 30,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Yoga Flow',
    category: 'Flexibility',
    description: 'Gentle yoga sequence for flexibility and relaxation',
    duration: 45,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Strength Training',
    category: 'Strength',
    description: 'Build muscle and increase strength with weights',
    duration: 60,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const fitnessGoals = [
  {
    id: 1,
    name: 'Weight Loss',
    exercises: [
      'Cardio (Running, Cycling)',
      'HIIT Workouts',
      'Strength Training',
      'Yoga for Flexibility'
    ],
    foods: [
      'Lean Proteins (Chicken, Fish)',
      'Leafy Greens',
      'Whole Grains',
      'Fruits and Vegetables'
    ]
  },
  {
    id: 2,
    name: 'Muscle Gain',
    exercises: [
      'Weight Lifting',
      'Bodyweight Exercises',
      'Compound Movements',
      'Progressive Overload Training'
    ],
    foods: [
      'High Protein Foods',
      'Complex Carbohydrates',
      'Healthy Fats',
      'Protein Shakes'
    ]
  },
  {
    id: 3,
    name: 'Endurance',
    exercises: [
      'Long Distance Running',
      'Swimming',
      'Cycling',
      'Circuit Training'
    ],
    foods: [
      'Complex Carbs (Oats, Brown Rice)',
      'Lean Proteins',
      'Energy Bars',
      'Hydration Drinks'
    ]
  }
];

export default Home; 