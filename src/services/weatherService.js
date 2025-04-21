import { API_CONFIG } from '../config/api';

export const weatherService = {
  async getCurrentWeather() {
    try {
      // First try to get user's location
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      console.log('User location:', { latitude, longitude });

      const response = await fetch(
        `${API_CONFIG.WEATHER.BASE_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_CONFIG.WEATHER.API_KEY}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Weather API error:', errorData);
        throw new Error(`Weather API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('Weather data received:', data);
      return data;
    } catch (error) {
      console.error('Error in getCurrentWeather:', error);
      
      // If geolocation fails, fall back to a default location
      try {
        console.log('Falling back to default location (New York)...');
        const response = await fetch(
          `${API_CONFIG.WEATHER.BASE_URL}/weather?q=New York&units=metric&appid=${API_CONFIG.WEATHER.API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        return data;
      } catch (fallbackError) {
        console.error('Error in fallback weather fetch:', fallbackError);
        throw new Error('Unable to fetch weather data');
      }
    }
  },

  getExerciseSuggestion(temperature) {
    if (temperature < 10) {
      return {
        suggestion: 'Indoor workouts are best in this cold weather',
        exercises: ['Yoga', 'Weightlifting', 'HIIT', 'Pilates']
      };
    } else if (temperature < 20) {
      return {
        suggestion: 'Perfect weather for outdoor activities',
        exercises: ['Running', 'Cycling', 'Hiking', 'Outdoor Sports']
      };
    } else if (temperature < 30) {
      return {
        suggestion: 'Great weather for intense workouts',
        exercises: ['Swimming', 'Running', 'Tennis', 'Basketball']
      };
    } else {
      return {
        suggestion: 'Stay cool with these exercises',
        exercises: ['Swimming', 'Indoor Cycling', 'Yoga', 'Water Sports']
      };
    }
  }
}; 