import axios from 'axios';
import { Pad } from '../models/types';

const API_URL = 'https://ll.thespacedevs.com/2.2.0/agencies';
const API_URL_Event_List = 'https://ll.thespacedevs.com/2.2.0/event/';

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
      console.log('Data fetched:', response.data.results);
      return response.data.results as Pad[];
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
