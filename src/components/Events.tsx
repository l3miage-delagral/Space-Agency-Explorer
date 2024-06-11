import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Event } from '../models/types';
import ApiService from '../services/ApiService';

const Events = ({ navigation, search }: { navigation: any, search: string }): JSX.Element => {
  const [events, setEvents] = useState([] as Event[]);
  const [filteredEvents, setFilteredEvents] = useState([] as Event[]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await ApiService.getEvent();
        if (Array.isArray(eventsData)) {
          setEvents(eventsData);
          setFilteredEvents(eventsData);
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
        onPress={() => navigation.navigate('Details', { eventId: item.id, eventType: 'event' })}
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
        data={filteredEvents}
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
  eventContainer: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
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
