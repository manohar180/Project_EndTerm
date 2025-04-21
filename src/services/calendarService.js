import { API_CONFIG } from '../config/api';

export const calendarService = {
  async initClient() {
    try {
      await window.gapi.client.init({
        apiKey: API_CONFIG.GOOGLE_CALENDAR.API_KEY,
        clientId: API_CONFIG.GOOGLE_CALENDAR.CLIENT_ID,
        discoveryDocs: API_CONFIG.GOOGLE_CALENDAR.DISCOVERY_DOCS,
        scope: API_CONFIG.GOOGLE_CALENDAR.SCOPES
      });
      return true;
    } catch (error) {
      console.error('Error initializing Google Calendar client:', error);
      return false;
    }
  },

  async scheduleWorkout(workoutData) {
    try {
      const event = {
        summary: `Workout: ${workoutData.type}`,
        description: `Duration: ${workoutData.duration} minutes\nIntensity: ${workoutData.intensity}`,
        start: {
          dateTime: workoutData.startTime,
          timeZone: 'UTC'
        },
        end: {
          dateTime: workoutData.endTime,
          timeZone: 'UTC'
        },
        reminders: {
          useDefault: true
        }
      };

      const response = await window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
      });

      return response.result;
    } catch (error) {
      console.error('Error scheduling workout:', error);
      throw error;
    }
  },

  async getUpcomingWorkouts() {
    try {
      const response = await window.gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
        q: 'Workout:'
      });

      return response.result.items;
    } catch (error) {
      console.error('Error fetching upcoming workouts:', error);
      throw error;
    }
  }
}; 