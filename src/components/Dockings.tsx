import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Docking } from '../models/types';
import ApiService from '../services/ApiService';
import { Card } from 'react-native-paper';

const Dockings = ({ navigation, search, sortOption }: any) => {
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
    const filtered = search === ''
      ? dockings
      : dockings.filter(docking =>
        docking.flight_vehicle.spacecraft.name.toLowerCase().includes(search.toLowerCase()) ||
        docking.flight_vehicle.spacecraft.description.toLowerCase().includes(search.toLowerCase())
        );
    setFilteredDockings(tri(filtered));
  }, [search, dockings, sortOption]);

  const tri = (table: Docking[]) : Docking[] => {
    const sortedDockings = [...table].sort((a, b) => {
      switch (sortOption) {
        case 'nameAsc':
          return a.flight_vehicle.spacecraft.name.localeCompare(b.flight_vehicle.spacecraft.name);
        case 'nameDesc':
          return b.flight_vehicle.spacecraft.name.localeCompare(a.flight_vehicle.spacecraft.name);
        case 'dateAsc':
          return new Date(a.docking).getTime() - new Date(b.docking).getTime();
        case 'dateDesc':
          return new Date(b.docking).getTime() - new Date(a.docking).getTime();
        default:
          return 0;
      }
    });
    return sortedDockings;
  };

  const renderDocking = ({ item }: { item: Docking }) => {
    const imageUrl = item.flight_vehicle.spacecraft.spacecraft_config.image_url || 'https://via.placeholder.com/150'; // Default image URL
    return (
      <Card
        style={styles.dockingContainer}
        onPress={() => navigation.navigate('Details', { eventId: item.id.toString(), eventType: 'docking' })}
      >
        
        <Card.Cover source={{ uri: imageUrl }} style={styles.dockingImage} />
        <Card.Content>
          <Text style={styles.title}>{item.flight_vehicle.spacecraft.name}</Text>
          
          <Text style={styles.title}>Docking : {new Date(item.docking).toLocaleDateString()}</Text>
          <Text>Destination : {item.flight_vehicle.destination}</Text>
          <Text>Location : {item.docking_location.name}</Text>
          <Text>Spacestation : {item.docking_location.spacestation.name}</Text>
          <Text>Description : {item.flight_vehicle.spacecraft.description}</Text>
          <Text>Agency : {item.flight_vehicle.spacecraft.spacecraft_config.agency.name}</Text>
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
