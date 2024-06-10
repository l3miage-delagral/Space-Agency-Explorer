import React, { PropsWithChildren, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, Touchable, TouchableOpacity, Linking } from 'react-native';
import { Launch, Pad } from '../models/types';
import ApiService from '../services/ApiService';
import { Card, List, MD3Colors } from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';

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

  const renderMissionDetails = () => {
    return (
      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Mission: {launch.mission.name}</Text>
        <Text style={styles.description}>{launch.mission.description}</Text>
        <Text>Mission type : {launch.mission.type}</Text>
        <Text>Orbit: {launch.mission.orbit.name}</Text>
        <>
          {launch.vidURLs && (
            <Text>Video: {launch.vidURLs.map((vid) => vid).join(', ')}</Text>
          )}
          {launch.infoURLs && (
            <Text>Info: {launch.infoURLs.map((info) => info).join(', ')}</Text>
          )}
        </>
      </View>
    );
  };
  
  const renderProviderDetails = () => {
    return (
      <View style={styles.contentSection}>
        <View style={styles.entete}>
          <Text style={styles.sectionTitle}>{launch.launch_service_provider.name}</Text>
          {launch.launch_service_provider.logo_url && (
            <Image source={{ uri: launch.launch_service_provider.logo_url }} style={styles.imageLogo} />
          )}
        </View>

        <>
          {launch.launch_service_provider.description && (
            <Text style={styles.description}>{launch.launch_service_provider.description}</Text>
          )}
        </>
        <Text>Provider Type: {launch.launch_service_provider.type}</Text>
        <Text>Provider Country: {launch.launch_service_provider.country_code}</Text>
        <>
          {launch.launch_service_provider.image_url && (
            <Image source={{ uri: launch.launch_service_provider.image_url }} style={styles.imageProvider
            } />
          )}
          {launch.launch_service_provider.url && (
            <TouchableOpacity onPress={() => Linking.openURL(launch.launch_service_provider.url ?? "")}>
              <Text>More Info</Text>
            </TouchableOpacity>
          )}
          {launch.launch_service_provider.wiki_url && (
            <TouchableOpacity style={styles.logoButton} onPress={() => Linking.openURL(launch.launch_service_provider.wiki_url)}>
              <Image source={require('../assets/wikipedia-logo.png')} style={styles.imageLogo} />
            </TouchableOpacity>
          )}
        </>
      </View>
    );
  }

  const renderRocketDetails = () => {
    return (
      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>{launch.rocket.configuration.name}</Text>
        <Text style={styles.description}>{launch.rocket.configuration.description}</Text>
        <Text>Family: {launch.rocket.configuration.family}</Text>
        <Text>Variant: {launch.rocket.configuration.variant}</Text>
        <Text>Maiden flight: {launch.rocket.configuration.maiden_flight}</Text>
        <List.Subheader>Launch Attempt Count</List.Subheader>
        <View style={styles.compteurs}>
          <Text> Total launch count: {launch.rocket.configuration.total_launch_count}</Text>
          <Text> Consecutive successful launches: {launch.rocket.configuration.consecutive_successful_launches}</Text>
          <Text> Successful launches: {launch.rocket.configuration.successful_launches}</Text>
          <Text> Failed launches: {launch.rocket.configuration.failed_launches}</Text>
          <Text> Pending launches: {launch.rocket.configuration.pending_launches}</Text>
        </View>
        {launch.rocket.configuration.image_url && (
            <Image source={{ uri: launch.rocket.configuration.image_url }} style={styles.imageProvider} />
          )}
        <List.Subheader>Manufacturer</List.Subheader>
        <Text>Manufacturer: {launch.rocket.configuration.manufacturer.name}</Text>
        <Text>Country: {launch.rocket.configuration.manufacturer.country_code}</Text>
        <Text>Founding year: {launch.rocket.configuration.manufacturer.founding_year}</Text>
        <>
          {launch.rocket.configuration.manufacturer.wiki_url && (
            <TouchableOpacity style={styles.logoButton} onPress={() => Linking.openURL(launch.rocket.configuration.manufacturer.wiki_url)}>
              <Image source={require('../assets/wikipedia-logo.png')} style={styles.imageLogo} />
            </TouchableOpacity>
          )}
        </>
      </View>
    );
  }

  const renderPadDetails = () => {
    return (
      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Pad: {launch.pad.name}</Text>
        {launch.pad.description && <Text style={styles.description}>{launch.pad.description}</Text>}
        { launch.pad.location && (
          <><Text>Location: {launch.pad.location.name}</Text><Text>Country: {launch.pad.location.country_code}</Text><Text style={styles.description}>{launch.pad.location.description}</Text></>
        )}
        
        <Text>Latitude: {launch.pad.latitude}</Text>
        <Text>Longitude: {launch.pad.longitude}</Text>
        <Text>Total Launch Count: {launch.pad.total_launch_count}</Text>
        <Text>Orbital Launch Attempt Count: {launch.pad.orbital_launch_attempt_count}</Text>
        {launch.pad.map_image && (
          <TouchableOpacity onPress={() => navigation.navigate('Map', { pad: launch.pad as Pad })}>
            <Image source={{ uri: launch.pad.map_image }} style={styles.imageProvider} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

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
              {renderMissionDetails()}
            </List.Accordion>
            <List.Accordion
              title="Launch Service Provider"
              left={(props) => <List.Icon {...props} icon="rocket" />}
              expanded={expandedProvider}
              onPress={() => handlePress('provider')}
              style={styles.accordion}>
              {renderProviderDetails()}
            </List.Accordion>
            <List.Accordion
              title="Rocket Details"
              left={(props) => <List.Icon {...props} icon="rocket" />}
              expanded={expandedRocket}
              onPress={() => handlePress('rocket')}
              style={styles.accordion}>
              {renderRocketDetails()}
            </List.Accordion>
            <List.Accordion
              title="Pad Details"
              left={(props) => <List.Icon {...props} icon="rocket" />}
              expanded={expandedPad}
              onPress={() => handlePress('pad')}
              style={styles.accordion}>
              {renderPadDetails()}
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
