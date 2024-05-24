import axios from 'axios';
import { Pad } from '../models/types';

const API_URL = 'https://ll.thespacedevs.com/2.2.0/agencies';

const API_URL_LAUNCHPADS = 'https://ll.thespacedevs.com/2.2.0/pad';

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

  getLaunchPads: async () : Promise<Pad[]> => {
    try {
      const response = await axios.get(`${API_URL_LAUNCHPADS}`);
      return response.data.results as Pad[];
    } catch (error) {
      console.error('Error fetching data pads:', error);
      throw error; 
    }
  },
};

export default ApiService;
