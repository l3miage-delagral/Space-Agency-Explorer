import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Docking } from '../models/types';
import ApiService from '../services/ApiService';
import { Card } from 'react-native-paper';
import Countdown from '../components/Countdown';

const Dockings = ({ navigation, search }: any) => {
  const [dockings, setDockings] = useState<Docking[]>([]);
  const [filteredDockings, setFilteredDockings] = useState([] as Docking[]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchDockings = async () => {
      try {
        const dockingsData = await ApiService.getDockings();
        if (Array.isArray(dockingsData)) {
          setDockings(dockingsData);
          setFilteredDockings(dockingsData);
        } else {
          console.error('Events data is not an array:', dockingsData);
        }
      } catch (error) {
        console.error('Failed to fetch launch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDockings();
  }, []);

  useEffect(() => {
    if (search === '') {
      setFilteredDockings(dockings);
    } else {
      const filtered = dockings.filter(docking =>
        docking.docking_location.name.toLowerCase().includes(search.toLowerCase()) ||
        docking.docking.toLowerCase().includes(search.toLowerCase()) ||
        docking.flight_vehicle.spacecraft.name.toLowerCase().includes(search.toLowerCase()) ||
        docking.flight_vehicle.destination.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredDockings(filtered);
    }
  }, [search, dockings]);

  const renderDocking = ({ item }: { item: Docking }) => {
    const imageUrl = item.flight_vehicle.spacecraft.spacecraft_config.image_url || 'https://via.placeholder.com/150'; // Default image URL
    // Calcul de la différence entre la date de docking et la date actuelle
    const dockingTime = new Date(item.docking).getTime();
    const currentTime = new Date().getTime();
    const initialCount = Math.max(Math.floor((dockingTime - currentTime) / 1000), 0);

    return (
      <Card
        style={styles.dockingContainer}
        onPress={() => navigation.navigate('Details', { eventId: item.id, eventType: 'docking' })}
      >
        <Card.Cover source={{ uri: imageUrl }} style={styles.dockingImage} />
        <Card.Content>
          <Text style={styles.title}>{item.flight_vehicle.spacecraft.name}</Text>
          
          <Text style={styles.title}>Docking : {item.docking}</Text>
          <Text>Destination : {item.flight_vehicle.destination}</Text>
          <Text>{item.docking_location.name}</Text>
          <Text>{item.docking_location.spacestation.name}</Text>
          <Text>{item.flight_vehicle.spacecraft.description}</Text>
          <Text>{item.flight_vehicle.spacecraft.spacecraft_config.agency.name}</Text>
        </Card.Content>
      </Card>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredDockings}
        renderItem={renderDocking}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dockingContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  dockingImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default Dockings;
