import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pad, Event } from '../models/types';

const API_URL = 'https://ll.thespacedevs.com/2.2.0/agencies';
const API_URL_EVENT_LIST = 'https://ll.thespacedevs.com/2.2.0/event/';
const API_URL_LAUNCHPADS = 'https://ll.thespacedevs.com/2.2.0/pad';

const CACHE_KEY_PADS = 'launchPadsCache';
const CACHE_KEY_EVENTS = 'eventsCache';
const CACHE_KEY_EVENT_DETAILS = 'eventDetailsCache';

const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours

const ApiService = {
  fetchSomeData: async () => {
    try {
      const response = await axios.get(`${API_URL}/pad`);
      console.log('Data fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  getLaunchPads: async (): Promise<Pad[]> => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY_PADS);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const now = new Date().getTime();
        if (now - timestamp < CACHE_EXPIRATION) {
          console.log('Using cached data');
          if (Array.isArray(data)) {
            return data;
          } else {
            console.error('Cached data is not an array:', data);
          }
        }
      }

      const response = await axios.get(API_URL_LAUNCHPADS);
      const data = response.data.results as Pad[];

      if (Array.isArray(data)) {
        await AsyncStorage.setItem(CACHE_KEY_PADS, JSON.stringify({ data, timestamp: new Date().getTime() }));
        return data;
      } else {
        console.error('Fetched data is not an array:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching data pads:', error);
      throw error;
    }
  },

  getEventById: async (eventId: number): Promise<Event | undefined> => {
    try {
      // Check for cached event list
      const cachedEvents = await AsyncStorage.getItem(CACHE_KEY_EVENTS);
      if (cachedEvents) {
        const { data: events } = JSON.parse(cachedEvents);
        const event = events.find((e: Event) => e.id === eventId);
        if (event) {
          console.log('Using cached event from event list');
          return event;
        }
      }

      // Check for cached event details
      const cachedEventDetails = await AsyncStorage.getItem(CACHE_KEY_EVENT_DETAILS + eventId);
      if (cachedEventDetails) {
        const { data, timestamp } = JSON.parse(cachedEventDetails);
        const now = new Date().getTime();
        if (now - timestamp < CACHE_EXPIRATION) {
          console.log('Using cached event details');
          return data;
        }
      }

      // Fetch data from API
      const response = await axios.get(`${API_URL_EVENT_LIST}${eventId}`);
      const data = response.data as Event;

      await AsyncStorage.setItem(CACHE_KEY_EVENT_DETAILS + eventId, JSON.stringify({ data, timestamp: new Date().getTime() }));
      return data;
    } catch (error) {
      console.error('Error fetching event details:', error);
      throw error;
    }
  },

  getEvent: async (): Promise<Event[]> => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY_EVENTS);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const now = new Date().getTime();
        if (now - timestamp < CACHE_EXPIRATION) {
          console.log('Using cached data');
          if (Array.isArray(data)) {
            return data;
          } else {
            console.error('Cached data is not an array:', data);
          }
        }
      }

      const response = await axios.get(API_URL_EVENT_LIST);
      const data = response.data.results as Event[];

      if (Array.isArray(data)) {
        await AsyncStorage.setItem(CACHE_KEY_EVENTS, JSON.stringify({ data, timestamp: new Date().getTime() }));
        return data;
      } else {
        console.error('Fetched data is not an array:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching data events:', error);
      throw error;
    }
  },
};

export default ApiService;
