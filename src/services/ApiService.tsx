import axios from 'axios';

const API_URL = 'https://ll.thespacedevs.com/2.2.0/agencies';
const API_URL_Event_List = 'https://ll.thespacedevs.com/2.2.0/event/';

const ApiService = {
  // Fonction pour récupérer des données depuis l'API
  fetchSomeData: async () => {
    try {
      const response = await axios.get(`${API_URL}/pad`);
      console.log('Data fetched:', response.data);
      return response.data; // Renvoie les données de la réponse
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Lève une erreur pour gérer dans le composant qui appelle ce service
    }
  },

  getLaunchPads: async () => {
    try {
      const apiUrl = `${API_URL}`;
      axios
        .get(apiUrl)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error.error);
        });
      const response = await axios.get(apiUrl);
      console.log(response);
      return response;
    } catch (error: any) {
      console.log(error.error);
      console.error('Error fetching launch pads:', error.message);
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
