import React, { PropsWithChildren, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, Touchable, TouchableOpacity, Linking } from 'react-native';
import { Launch } from '../models/types';
import ApiService from '../services/ApiService';
import { Card, List, MD3Colors } from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
import renderLaunchDetails from '../components/renderLaunchDetail';

const LaunchDetail = ({ route, navigation }: PropsWithChildren<any>): JSX.Element => {
  const { eventId, eventType } = route.params;
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedMission, setExpandedMission] = useState(false);
  const [expandedProvider, setExpandedProvider] = useState(false);
  const [expandedRocket, setExpandedRocket] = useState(false);
  const [expandedPad, setExpandedPad] = useState(false);

  const handlePress = (section: string) => {
    if (section === 'mission') {
      setExpandedMission(!expandedMission);
      setExpandedProvider(false);
      setExpandedRocket(false);
      setExpandedPad(false);
    } else if (section === 'provider') {
      setExpandedProvider(!expandedProvider);
      setExpandedMission(false);
      setExpandedRocket(false);
      setExpandedPad(false);
    } else if (section === 'rocket') {
      setExpandedRocket(!expandedRocket);
      setExpandedMission(false);
      setExpandedProvider(false);
      setExpandedPad(false);
    } else if (section === 'pad') {
      setExpandedPad(!expandedPad);
      setExpandedMission(false);
      setExpandedProvider(false);
      setExpandedRocket(false);
    }
  };

  useEffect(() => {
    const fetchLaunchDetails = async () => {
      try {
        const launchData = await ApiService.getLaunchById(eventId);
        setLaunch(launchData || null);
      } catch (error) {
        console.error('Failed to fetch launch details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaunchDetails();
  }, [eventId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!launch) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Unable to load event details.</Text>
      </View>
    );
  }

  const imageUrl = launch.image || 'https://via.placeholder.com/150'; // Default image URL

  const getYoutubeVideoId = (url: string) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/) || url.match(/(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: imageUrl }} style={styles.image} />
        <Card.Content style={styles.cardContent}>
          <Text style={styles.title}>{launch.name}</Text>
          <Text style={styles.status}>{launch.status.name}</Text>
          <Text style={styles.description}>{launch.status.description}</Text>
          <Text style={styles.description}>Launch Date: {new Date(launch.net).toLocaleDateString()}</Text>
          <List.Section style={styles.sectionAccordion}>
            <List.Accordion
              title="Mission Details"
              left={(props) => <List.Icon {...props} icon="rocket" />}
              expanded={expandedMission}
              onPress={() => handlePress('mission')}
              style={styles.accordion}>
              {renderLaunchDetails({ launch: launch, section: 'mission', navigation })}
            </List.Accordion>
            <List.Accordion
              title="Launch Service Provider"
              left={(props) => <List.Icon {...props} icon="rocket" />}
              expanded={expandedProvider}
              onPress={() => handlePress('provider')}
              style={styles.accordion}>
              {renderLaunchDetails({ launch: launch, section: 'provider', navigation })}
            </List.Accordion>
            <List.Accordion
              title="Rocket Details"
              left={(props) => <List.Icon {...props} icon="rocket" />}
              expanded={expandedRocket}
              onPress={() => handlePress('rocket')}
              style={styles.accordion}>
              {renderLaunchDetails({ launch: launch, section: 'rocket', navigation })}
            </List.Accordion>
            <List.Accordion
              title="Pad Details"
              left={(props) => <List.Icon {...props} icon="rocket" />}
              expanded={expandedPad}
              onPress={() => handlePress('pad')}
              style={styles.accordion}>
              {renderLaunchDetails({ launch: launch, section: 'pad', navigation })}
            </List.Accordion>
          </List.Section>
          <Text style={styles.description}>Last updated: {launch.last_updated}</Text>

          {launch.vidURLs && launch.vidURLs.map((vid, index) => {
            const videoId = getYoutubeVideoId(vid.url);
            return (
              videoId && (
                <YoutubePlayer
                  key={index}
                  height={200}
                  play={false}
                  videoId={videoId}
                />
              )
            );
          })}
        </Card.Content>
      </Card>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  accordion: {
    minWidth: '100%',
    maxWidth: '100%',
  },
  sectionAccordion: {
    width: '100%',
    marginVertical: 5,
  },
  card: {
    minWidth: '100%',
    maxWidth: '100%',
    padding: 10,
  },
  cardContent: {
    padding: 10,
  },
  contentSection: {
    backgroundColor: MD3Colors.neutral90,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    padding: 10,
  },
  status: {
    marginBottom: 5,
    fontSize: 16,
  },
  description: {
    marginBottom: 10,
    fontSize: 14,
  },
  imageProvider: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  logoButton: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: 60,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  entete: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  compteurs: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});



export default LaunchDetail;
