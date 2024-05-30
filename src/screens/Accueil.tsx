import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PropsWithChildren, useEffect, useState} from 'react';
import ApiService from '../services/ApiService';
import {Event} from '../models/types';

const Accueil = ({navigation}: PropsWithChildren<any>): JSX.Element => {
  const [events, setEvents] = useState([] as Event[]);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await ApiService.getEvent();
        if (Array.isArray(eventsData)) {
          setEvents(eventsData as Event[]);
        } else {
          console.error('Events data is not an array:', eventsData);
        }
      } catch (error) {
        console.error('Failed to fetch launch events:', error);
      }
    };

    fetchEvents();
  }, []); 

  return (
    <View style={styles.cardContainer}>
      <FlatList
        data={events}
        keyExtractor={(event) => event.id.toString()} 
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventDescription}>{item.description}</Text>
            <Text style={styles.eventLocation}>{item.location}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    padding: 10,
  },
  eventContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 12,
    color: '#888',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  titre: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Accueil;
