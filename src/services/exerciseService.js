import { API_CONFIG } from '../config/api';

export const exerciseService = {
  async getExercises() {
    try {
      if (!API_CONFIG.RAPID_API.API_KEY || API_CONFIG.RAPID_API.API_KEY === 'YOUR_RAPID_API_KEY') {
        throw new Error('Please add your RapidAPI key in the config file');
      }

      const response = await fetch('https://exercisedb.p.rapidapi.com/exercises', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_CONFIG.RAPID_API.API_KEY,
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch exercises');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in getExercises:', error);
      throw error;
    }
  },

  async getExerciseById(id) {
    try {
      if (!API_CONFIG.RAPID_API.API_KEY || API_CONFIG.RAPID_API.API_KEY === 'YOUR_RAPID_API_KEY') {
        throw new Error('Please add your RapidAPI key in the config file');
      }

      const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_CONFIG.RAPID_API.API_KEY,
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch exercise details');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in getExerciseById:', error);
      throw error;
    }
  },

  async getExercisesByBodyPart(bodyPart) {
    try {
      if (!API_CONFIG.RAPID_API.API_KEY || API_CONFIG.RAPID_API.API_KEY === 'YOUR_RAPID_API_KEY') {
        throw new Error('Please add your RapidAPI key in the config file');
      }

      const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_CONFIG.RAPID_API.API_KEY,
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch exercises by body part');
      }

      return await response.json();
    } catch (error) {
      console.error('Error in getExercisesByBodyPart:', error);
      throw error;
    }
  }
}; 