import React, { PropsWithChildren, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, Image, View, ActivityIndicator, Linking, TouchableOpacity } from 'react-native';
import ApiService from '../services/ApiService';
import { Event } from '../models/types';
import YoutubePlayer from 'react-native-youtube-iframe';

const EventDetail = ({ route, navigation }: PropsWithChildren<any>): JSX.Element => {
  const eventId = route;
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

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|user\/(?:[^\#&?]*\/)+))([^#&?]*).*/);
    return match && match[1].length === 11 ? match[1] : null;
  };

  const videoId = event.video_url ? getYouTubeVideoId(event.video_url) : null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.eventImage} />
      <Text style={styles.eventName}>{event.name}</Text>
      <Text style={styles.eventDate}>{new Date(event.date).toLocaleString()}</Text>
      <Text style={styles.eventDescription}>{event.description}</Text>
      <Text style={styles.eventLocation}>{event.location}</Text>
      <Text style={styles.eventDescription}>Last updated: {event.last_updated}</Text>
      {event.info_url && (
        <TouchableOpacity onPress={() => handleLinkPress(event.info_url[0] ?? "")}>
          <Text style={styles.linkText}>Info</Text>
        </TouchableOpacity>
      )}
      {event.news_url && (
        <TouchableOpacity onPress={() => handleLinkPress(event.news_url ?? "")}>
          <Text style={styles.linkText}>News site</Text>
        </TouchableOpacity>
      )}
      {videoId && (
        <View style={styles.videoContainer}>
          <YoutubePlayer
            height={200}
            play={false}
            videoId={videoId}
          />
        </View>
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
  linkText: {
    fontSize: 14,
    color: '#1e90ff',
    marginTop: 5,
    textAlign: 'center',
  },
  videoContainer: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});

export default EventDetail;
