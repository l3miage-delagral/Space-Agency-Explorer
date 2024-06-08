import React, { PropsWithChildren, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { Launch } from '../models/types';
import ApiService from '../services/ApiService';
import { Card, List, MD3Colors } from 'react-native-paper';

const LaunchDetail = ({ route, navigation }: PropsWithChildren<any>): JSX.Element => {
  const { eventId, eventType } = route.params;
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedMission, setExpandedMission] = React.useState(false);
  const [expandedProvider, setExpandedProvider] = React.useState(false);

  const handlePress = (section: string) => {
    if (section === 'mission') {
      setExpandedMission(!expandedMission);
    } else if (section === 'provider') {
      setExpandedProvider(!expandedProvider);
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
        <Text style={styles.sectionTitle}>{launch.launch_service_provider.name}</Text>
        <>
          {launch.launch_service_provider.description && (
            <Text style={styles.description}>{launch.launch_service_provider.description}</Text>
          )}
        </>
        <Text>Provider Type: {launch.launch_service_provider.type}</Text>
        <Text>Provider Country: {launch.launch_service_provider.country_code}</Text>
        <>
          {launch.launch_service_provider.url && (
            <Text>Provider URL: {launch.launch_service_provider.url}</Text>
          )}
          {launch.launch_service_provider.wiki_url && (
            <Text>Provider Wiki: {launch.launch_service_provider.wiki_url}</Text>
          )}
          {launch.launch_service_provider.image_url && (
            <Image source={{ uri: launch.launch_service_provider.image_url }} style={styles.image} />
          )}
        </>
      </View>
    );
  }

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
          </List.Section>
          <Text style={styles.description}>Last updated: {launch.last_updated}</Text>
          
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
});



export default LaunchDetail;
