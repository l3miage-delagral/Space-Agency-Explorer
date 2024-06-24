import React, { useEffect, useState } from 'react';
import { FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Event } from '../models/types';
import ApiService from '../services/ApiService';
import style from '../models/style';
import { Card } from 'react-native-paper';

const Events = ({ navigation, search, sortOption}: { navigation: any, search: string, sortOption: string}): JSX.Element => {
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
    const filtered = search === ''
      ? events
      : events.filter(event =>
          event.name.toLowerCase().includes(search.toLowerCase()) ||
          event.description.toLowerCase().includes(search.toLowerCase())
        );
    setFilteredEvents(tri(filtered));
  }, [search, events, sortOption]);

  const tri = (table: Event[]) : Event[] => {
    const sortedEvents = [...table].sort((a, b) => {
      switch (sortOption) {
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        case 'dateAsc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'dateDesc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        default:
          return 0;
      }
    });
    return sortedEvents;
  };

  const renderEvent = ({ item }: { item: Event }) => {
    const imageUrl = item.feature_image || 'https://via.placeholder.com/150'; // URL de l'image par défaut
    return (
      <Card
        style={style.Card}
        onPress={() => navigation.navigate('Details', { eventId: item.id, eventType: 'event' })}
      >
        <Card.Cover source={{ uri: imageUrl }} style={style.Cover} />

        <Card.Content>
          <Text style={style.Title}>{item.name}</Text>
          <Text style={style.Status}>{new Date(item.date).toLocaleString()}</Text>
          <Text style={style.Description}>{item.description}</Text>
          <Text style={styles.eventLocation}>{item.location}</Text>
          {item.info_url?.length > 0 && (
            <Text style={styles.eventInfoUrl}>
              <Text style={styles.boldText}>Info:</Text> {item.info_url[0]}
            </Text>
          )}
          {item.news_url && (
            <Text style={styles.eventNewsUrl} onPress={() => Linking.openURL(item.news_url ?? "")}>
              <Text style={styles.boldText}>News:</Text> {item.news_url}
            </Text>
          )}
        </Card.Content>
      </Card>
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
  eventLocation: {
    fontSize: 16,
    color: '#888',
    fontWeight: 'bold',
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
