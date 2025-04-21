export const API_CONFIG = {
  NUTRITIONIX: {
    APP_ID: 'YOUR_NUTRITIONIX_APP_ID',
    APP_KEY: 'YOUR_NUTRITIONIX_APP_KEY',
    BASE_URL: 'https://trackapi.nutritionix.com/v2'
  },
  GOOGLE_CALENDAR: {
    CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID',
    API_KEY: 'YOUR_GOOGLE_API_KEY'
  },
  WEATHER: {
    API_KEY: import.meta.env.VITE_WEATHER_API_KEY,
    BASE_URL: import.meta.env.VITE_WEATHER_BASE_URL
  },
}; 