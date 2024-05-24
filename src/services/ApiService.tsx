import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pad } from '../models/types';

const API_URL = 'https://ll.thespacedevs.com/2.2.0/agencies';
const API_URL_Event_List = 'https://ll.thespacedevs.com/2.2.0/event/';

const API_URL_LAUNCHPADS = 'https://ll.thespacedevs.com/2.2.0/pad';

const CACHE_KEY = 'launchPadsCache';
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
      // Check for cached data
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
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

      // Fetch data from API
      const response = await axios.get(API_URL_LAUNCHPADS);
      const data = response.data.results as Pad[];

      if (Array.isArray(data)) {
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: new Date().getTime() }));
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
  // Autres fonctions pour appeler différentes routes de l'API

  getEventList: () => {
    try {
      const apiUrl = `${API_URL_Event_List}`;
      return axios.get(apiUrl);
    } catch (error: any) {
      console.log(error.error);
      console.error('Error fetching launch pads:', error.message);
      throw error;
    }
  },
};

export default ApiService;
