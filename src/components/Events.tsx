import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Event } from '../models/types';
import ApiService from '../services/ApiService';

const Events = ({ navigation }: any): JSX.Element => {
  const [events, setEvents] = useState([] as Event[]);
  const [search, setSearch] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([] as Event[]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await ApiService.getEvent();
        if (Array.isArray(eventsData)) {
          setEvents(eventsData);
        } else {
          console.error('Events data is not an array:', eventsData);
        }
      } catch (error) {
        console.error('Failed to fetch launch events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (search === '') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => 
        event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [search, events]);

  const renderEvent = ({ item }: { item: Event }) => {
    const imageUrl = item.feature_image || 'https://via.placeholder.com/150'; // URL de l'image par défaut
    return (
      <TouchableOpacity
        style={styles.eventContainer}
        onPress={() => navigation.navigate('EventDetails', { eventId: item.id })}
      >
        <Image source={{ uri: imageUrl }} style={styles.eventImage} />
        <View style={styles.textContainer}>
          <Text style={styles.eventName}>{item.name}</Text>
          <Text style={styles.eventDescription}>{item.description}</Text>
          <Text style={styles.eventLocation}>{item.location}</Text>
          {item.info_url?.length > 0 && (
            <Text style={styles.eventInfoUrl}>
              <Text style={styles.boldText}>Info:</Text> {item.info_url[0]}
            </Text>
          )}
          {item.news_url && (
            <Text style={styles.eventNewsUrl}>
              <Text style={styles.boldText}>News:</Text> {item.news_url}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
    width: '90%',
  },
  cardContainer: {
    padding: 10,
    width: '100%',
  },
  eventContainer: {
    padding: 10,
    marginVertical: 10, // Augmenter la marge verticale
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  eventImage: {
    width: '100%', // Prendre toute la largeur
    height: 200, // Augmenter la hauteur de l'image
    borderRadius: 10,
    marginBottom: 10, // Ajouter une marge en bas
  },
  textContainer: {
    flex: 1,
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
  eventInfoUrl: {
    fontSize: 12,
    color: '#1e90ff',
    marginTop: 5,
  },
  eventNewsUrl: {
    fontSize: 12,
    color: '#1e90ff',
    marginTop: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default Events;
