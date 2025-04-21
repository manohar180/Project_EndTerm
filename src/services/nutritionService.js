import { API_CONFIG } from '../config/api';

export const nutritionService = {
  async searchFood(query) {
    try {
      const response = await fetch(`${API_CONFIG.NUTRITIONIX.BASE_URL}/natural/nutrients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': API_CONFIG.NUTRITIONIX.APP_ID,
          'x-app-key': API_CONFIG.NUTRITIONIX.APP_KEY,
        },
        body: JSON.stringify({
          query: query
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch nutrition data');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
      throw error;
    }
  },

  async getDailyCalories(age, gender, height, weight, activityLevel) {
    try {
      const response = await fetch(`${API_CONFIG.NUTRITIONIX.BASE_URL}/natural/daily-calories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': API_CONFIG.NUTRITIONIX.APP_ID,
          'x-app-key': API_CONFIG.NUTRITIONIX.APP_KEY,
        },
        body: JSON.stringify({
          age,
          gender,
          height,
          weight,
          activity_level: activityLevel
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch daily calories');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching daily calories:', error);
      throw error;
    }
  }
}; 