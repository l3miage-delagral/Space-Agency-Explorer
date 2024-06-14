import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pad, Event, Launch, Docking } from '../models/types';

const API_URL = 'https://ll.thespacedevs.com/2.2.0/agencies';
const API_URL_EVENT_LIST = 'https://ll.thespacedevs.com/2.2.0/event/';
const API_URL_LAUNCHPADS = 'https://ll.thespacedevs.com/2.2.0/pad';
const API_URL_LAUNCHES = 'https://ll.thespacedevs.com/2.2.0/launch/';
const API_URL_DOCKING = 'https://ll.thespacedevs.com/2.2.0/docking_event/';

const CACHE_KEY_PADS = 'launchPadsCache';
const CACHE_KEY_EVENTS = 'eventsCache';
const CACHE_KEY_EVENT_DETAILS = 'eventDetailsCache';
const CACHE_KEY_LAUNCHES = 'launchesCache';
const CACHE_KEY_LAUNCHES_DETAILS = 'launchesDetailsCache';
const CACHE_KEY_DOCKING = 'dockingCache';
const CACHE_KEY_DOCKING_DETAILS = 'dockingDetailsCache';

const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 heures

const ApiService = {
  fetchSomeData: async () => {
    try {
      const response = await axios.get(`${API_URL}/pad`);
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

      // Check for cached event details
      const cachedEventDetails = await AsyncStorage.getItem(CACHE_KEY_EVENT_DETAILS + eventId);
      if (cachedEventDetails) {
        const { data, timestamp } = JSON.parse(cachedEventDetails);
        const now = new Date().getTime();
        if (now - timestamp < CACHE_EXPIRATION) {
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

  getLaunches: async (): Promise<Launch[]> => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY_LAUNCHES);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const now = new Date().getTime();
        if (now - timestamp < CACHE_EXPIRATION) {
          if (Array.isArray(data)) {
            return data as Launch[];
          } else {
            console.error('Cached data is not an array:', data);
          }
        }
      }

      const response = await axios.get(API_URL_LAUNCHES);
      const data = response.data.results as Launch[];

      if (Array.isArray(data)) {
        await AsyncStorage.setItem(CACHE_KEY_LAUNCHES, JSON.stringify({ data, timestamp: new Date().getTime() }));
        return data as Launch[];
      } else {
        console.error('Fetched data is not an array:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching data events:', error);
      throw error;
    }
  },

  getLaunchById: async (launchId: string): Promise<Launch | undefined> => {
    try {

      // Check for cached launch details
      const cachedDockingDetails = await AsyncStorage.getItem(CACHE_KEY_LAUNCHES_DETAILS + launchId);
      if (cachedDockingDetails) {
        const { data, timestamp } = JSON.parse(cachedDockingDetails);
        const now = new Date().getTime();
        if (now - timestamp < CACHE_EXPIRATION) {
          return data as Launch;
        }
      }

      // Fetch data from API
      const response = await axios.get(`${API_URL_LAUNCHES}${launchId}`);
      const data = response.data as Launch;

      await AsyncStorage.setItem(CACHE_KEY_LAUNCHES_DETAILS + launchId, JSON.stringify({ data, timestamp: new Date().getTime() }));
      
      return data as Launch;
    } catch (error) {
      console.error('Error fetching launch details:', error);
      throw error;
    }
  },

  getDockings: async () => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY_DOCKING);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const now = new Date().getTime();
        if (now - timestamp < CACHE_EXPIRATION) {
          if (Array.isArray(data)) {
            return data as Docking[];
          } else {
            console.error('Cached data is not an array:', data);
          }
        }
      }

      const response = await axios.get(API_URL_DOCKING);
      const data = response.data.results as Docking[];

      if (Array.isArray(data)) {
        await AsyncStorage.setItem(CACHE_KEY_DOCKING, JSON.stringify({ data, timestamp: new Date().getTime() }));
        return data as Docking[];
      } else {
        console.error('Fetched data is not an array:', data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching data events:', error);
      throw error;
    }
  },

  getDockingById : async (dockingId: number): Promise<Docking | undefined> => {
    try {

      // Check for cached docking details
      const cachedDockingDetails = await AsyncStorage.getItem(CACHE_KEY_DOCKING_DETAILS + dockingId);
      if (cachedDockingDetails) {
        const { data, timestamp } = JSON.parse(cachedDockingDetails);
        const now = new Date().getTime();
        if (now - timestamp < CACHE_EXPIRATION) {
          return data as Docking;
        }
      }

      // Fetch data from API
      const response = await axios.get(`${API_URL_DOCKING}${dockingId}`);
      const data = response.data as Docking;

      await AsyncStorage.setItem(CACHE_KEY_DOCKING + dockingId, JSON.stringify({ data, timestamp: new Date().getTime() }));
      
      return data as Docking;
    } catch (error) {
      console.error('Error fetching docking details:', error);
      throw error;
    }
  }
};

export default ApiService;
