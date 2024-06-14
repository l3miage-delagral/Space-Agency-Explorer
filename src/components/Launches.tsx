import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Launch } from '../models/types';
import ApiService from '../services/ApiService';
import { Avatar, Card } from 'react-native-paper';

const Launches = ({ navigation, search, sortOption }: { navigation: any, search: string, sortOption: string }): JSX.Element => {
  const [launches, setLaunches] = useState([] as Launch[]);
  const [filteredLaunches, setFilteredLaunches] = useState([] as Launch[]);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const launchesData = await ApiService.getLaunches();
        if (Array.isArray(launchesData)) {
          setLaunches(launchesData);
          setFilteredLaunches(launchesData); // Initialize filtered launches with all launches
        } else {
          console.error('Launches data is not an array:', launchesData);
        }
      } catch (error) {
        console.error('Failed to fetch launches:', error);
      }
    };

    fetchLaunches();
  }, []);

  useEffect(() => {
    const filtered = search === ''
      ? launches
      : launches.filter(launch =>
        launch.name.toLowerCase().includes(search.toLowerCase()) ||
        launch.status.description.toLowerCase().includes(search.toLowerCase())
        );
    setFilteredLaunches(tri(filtered));
  }, [search, launches, sortOption]);

  const tri = (table: Launch[]) : Launch[] => {
    const sortedlaunchs = [...table].sort((a, b) => {
      switch (sortOption) {
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        case 'dateAsc':
          return new Date(a.window_start).getTime() - new Date(b.window_start).getTime();
        case 'dateDesc':
          return new Date(b.window_start).getTime() - new Date(a.window_start).getTime();
        default:
          return 0;
      }
    });
    return sortedlaunchs;
  };

  const renderLaunch = ({ item }: { item: Launch }) => {
    const imageUrl = item.image || 'https://via.placeholder.com/150'; // Default image URL
    const statusName = item.status ? item.status.name : 'Status Unknown';
    const launchDate = item.net ? new Date(item.net).toLocaleDateString() : 'Date Unknown';
    return (
      <Card
        style={styles.launchContainer}
        onPress={() => navigation.navigate('Details', { eventId: item.id, eventType: 'launch' })}
      >
        <Card.Cover source={{ uri: imageUrl }} style={styles.launchImage} />
        <Card.Content>
          <Text style={styles.launchName}>{item.name ?? "Unknown Name"}</Text>
          <Text style={styles.launchStatus}>{statusName}</Text>
          <Text style={styles.launchDescription}>{item.status.description}</Text>
          <Text style={styles.launchDate}>{launchDate}</Text>
        </Card.Content>
      </Card>
    );
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredLaunches}
        renderItem={renderLaunch}
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
  launchContainer: {
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
  launchImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  launchName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  launchStatus: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  launchDate: {
    fontSize: 14,
    color: '#1e90ff',
  },
  launchDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
});

export default Launches;
