import { ScrollView, StyleSheet, Text, Image, View, ActivityIndicator, Linking } from 'react-native';
import { PropsWithChildren, useEffect, useState } from 'react';
import ApiService from '../services/ApiService';
import { Event } from '../models/types';

const EventDetails = ({ route, navigation }: PropsWithChildren<any>): JSX.Element => {
  const { eventId } = route.params;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventData = await ApiService.getEventById(eventId);
        setEvent(eventData || null);
      } catch (error) {
        console.error('Failed to fetch event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Unable to load event details.</Text>
      </View>
    );
  }

  const imageUrl = event.feature_image || 'https://via.placeholder.com/150';

  const handleLinkPress = (url: string) => {
    if (url !== '') {
      Linking.openURL(url);
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.eventImage} />
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventDate}>{new Date(event.date).toLocaleString()}</Text>
      <Text style={styles.eventDescription}>{event.description}</Text>
      <Text style={styles.eventLocation}>{event.location}</Text>
      <Text style={styles.eventDescription}>last updated : {event.last_updated}</Text>
      {event.info_url && (
        <Text style={styles.eventInfoUrl}>
          <Text style={styles.boldText}>Info:</Text> {event.info_url[0]}
        </Text>
      )}
      {event.news_url && (
        <Text style={styles.eventNewsUrl}>
          <Text style={styles.boldText}>News:</Text> {event.news_url}
        </Text>
      )}
      {event.video_url && (
        <Text style={styles.eventVideoUrl}>
          <Text style={styles.boldText}>Video:</Text> <Text onPress={() => handleLinkPress(event.video_url ?? "")}>{event.video_url}</Text>
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  eventDate: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  eventDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  eventLocation: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  eventInfoUrl: {
    fontSize: 14,
    color: '#1e90ff',
    marginTop: 5,
    textAlign: 'center',
  },
  eventNewsUrl: {
    fontSize: 14,
    color: '#1e90ff',
    marginTop: 5,
    textAlign: 'center',
  },
  eventVideoUrl: {
    fontSize: 14,
    color: '#1e90ff',
    marginTop: 5,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default EventDetails;
