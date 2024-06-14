import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, Image, View, ActivityIndicator } from 'react-native';
import ApiService from '../services/ApiService';
import { Docking } from '../models/types';
import { Card, List } from 'react-native-paper';

const DockingDetail = ({ route }: any) => {
  const [docking, setDocking] = useState<Docking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDockingDetails = async () => {
      try {
        const dockingData = await ApiService.getDockingById(route);
        setDocking(dockingData || null);
      } catch (error) {
        console.error('Failed to fetch docking details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDockingDetails();
  }, [route]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!docking) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Unable to load docking details.</Text>
      </View>
    );
  }

  const imageUrl = docking.flight_vehicle.spacecraft.spacecraft_config.image_url || 'https://via.placeholder.com/150';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
      <Card.Cover source={{ uri: imageUrl }} style={styles.image} />
      <Card.Content style={styles.cardContent}>
        <Text style={styles.dockingName}>{docking.flight_vehicle.spacecraft.spacecraft_config.name}</Text>
        <Text style={styles.dockingDate}> Docking : {}</Text>
        <Text style={styles.dockingDate}> Departure : {docking.departure}</Text>

        <List.Subheader style={styles.titleSection}>Docking</List.Subheader>
        <Text style={styles.dockingDestination}>Destination : {docking.flight_vehicle.destination}</Text>
        <Text style={styles.dockingLocation}>{docking.docking_location.name}</Text>
        <Text style={styles.spacestationName}>{docking.space_station.name}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dockingName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  dockingDate: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  dockingDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  dockingDestination: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  dockingLocation: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  spacestationName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  agencyName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  card: {
    minWidth: '100%',
    maxWidth: '100%',
    padding: 10,
  },
  cardContent: {
    padding: 10,
  },
  titleSection: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DockingDetail;
