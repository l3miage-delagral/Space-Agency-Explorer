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
        <Text style={styles.dockingDate}> Docking : {new Date(docking.docking).toLocaleDateString()}</Text>
        <Text style={styles.dockingDate}> Departure : {new Date(docking.departure).toLocaleDateString()}</Text>
        {/* <Text style={styles.dockingDescription}>{docking.}</Text> */}
        

        <List.Subheader style={styles.titleSection}>Flight vehicule</List.Subheader>
        <Text style={styles.dockingDestination}>Destination : {docking.flight_vehicle.destination}</Text>
        <Text style={styles.dockingLocation}>Mission end : {new Date(docking.flight_vehicle.mission_end).toLocaleDateString()}</Text>

        <List.Subheader style={styles.titleSection}>SpaceCraft</List.Subheader>
        <Text style={styles.spacestationName}>{docking.flight_vehicle.spacecraft.name}</Text>
        <Text style={styles.spacestationName}>{docking.flight_vehicle.spacecraft.description}</Text>
        <Text style={styles.spacestationName}>Flights count : {docking.flight_vehicle.spacecraft.flights_count}</Text>
        <Text style={styles.spacestationName}>Status : {docking.flight_vehicle.spacecraft.status.name}</Text>

        <List.Subheader style={styles.titleSection}>SpaceCraft config</List.Subheader>
        <Text style={styles.spacestationName}>{docking.flight_vehicle.spacecraft.spacecraft_config.name}</Text>
        <Text style={styles.spacestationName}>Type : {docking.flight_vehicle.spacecraft.spacecraft_config.type.name}</Text>
        <Text style={styles.spacestationName}>Agency : {docking.flight_vehicle.spacecraft.spacecraft_config.agency.name}</Text>
        <Text style={styles.spacestationName}>Agency type : {docking.flight_vehicle.spacecraft.spacecraft_config.agency.type}</Text>

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
