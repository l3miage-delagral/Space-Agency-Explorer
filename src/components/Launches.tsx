import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Alert } from 'react-native';
import { Launch } from '../models/types';
import ApiService from '../services/ApiService';
import { Card, Button } from 'react-native-paper';
import Countdown from '../utils/Countdown';
import { addEventToCalendar } from '../utils/addEventToCalendar';

const Launches = ({ navigation, search, sortOption }: { navigation: any, search: string, sortOption: string }): JSX.Element => {
  const [launches, setLaunches] = useState([] as Launch[]);
  const [filteredLaunches, setFilteredLaunches] = useState([] as Launch[]);
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const [currentLaunchesData, upcomingLaunchesData] = await Promise.all([
          ApiService.getLaunches(),
          ApiService.getUpcomingLaunches()
        ]);

        const allLaunches = [...currentLaunchesData, ...upcomingLaunchesData];
        if (Array.isArray(allLaunches)) {
          setLaunches(allLaunches);
          setFilteredLaunches(allLaunches);
        } else {
          console.error('Launches data is not an array:', allLaunches);
        }
      } catch (error) {
        console.error('Failed to fetch launches:', error);
      }
    };

    fetchLaunches();
  }, []);

  useEffect(() => {
    const now = new Date();
    const filtered = launches.filter(launch => {
      const launchDate = new Date(launch.window_start);
      if (filter === 'upcoming') {
        return launchDate >= now;
      } else {
        return launchDate < now;
      }
    }).filter(launch =>
      search === '' ||
      launch.name.toLowerCase().includes(search.toLowerCase()) ||
      launch.status.description.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredLaunches(tri(filtered));
  }, [search, launches, sortOption, filter]);

  const tri = (table: Launch[]): Launch[] => {
    const now = new Date().getTime();

    const sortedLaunches = [...table].sort((a, b) => {
      const timeA = new Date(a.window_start).getTime();
      const timeB = new Date(b.window_start).getTime();
      const diffA = Math.abs(timeA - now);
      const diffB = Math.abs(timeB - now);

      switch (sortOption) {
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        case 'dateAsc':
          return new Date(a.window_start).getTime() - new Date(b.window_start).getTime();
        case 'dateDesc':
          return diffA - diffB;
        default:
          return 0;
      }
    });
    return sortedLaunches;
  };

  const renderLaunch = ({ item }: { item: Launch }) => {
    const imageUrl = item.image || 'https://via.placeholder.com/150';
    const statusName = item.status ? item.status.name : 'Status Unknown';
    const launchDate = item.net ? new Date(item.net) : null;
    const launchDateString = launchDate ? launchDate.toLocaleDateString() : 'Date Unknown';

    return (
      <Card
        style={styles.launchContainer}
        onPress={() => navigation.navigate('Details', { eventId: item.id, eventType: 'launch' })}
      >
        <Card.Cover source={{ uri: imageUrl }} style={styles.launchImage} />
        <Card.Content>
          <Text style={styles.launchName}>{item.name ?? "Unknown Name"}</Text>
          <Text style={styles.launchStatus}>{statusName}</Text>
          <Text style={styles.launchDescription}>By {item.launch_service_provider.name}</Text>
          {launchDate && launchDate > new Date() && <Countdown targetDate={launchDate} />}
          <Text style={styles.launchDate}>{launchDateString}</Text>
          <Text style={styles.launchDescription}>{item.status.description}</Text>
          {launchDate && launchDate > new Date() && (
            <Button
              mode="contained"
              onPress={() => addEventToCalendar(item.name, launchDate ?? new Date(), 'Launch Site')}
            >
              Add to Calendar
            </Button>
          )}
        </Card.Content>
      </Card>
    );
  };

  const toggleFilter = () => {
    setFilter(prevFilter => (prevFilter === 'upcoming' ? 'past' : 'upcoming'));
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={toggleFilter} style={styles.filterButton}>
        {filter === 'upcoming' ? 'Show Past Events' : 'Show Upcoming Events'}
      </Button>
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
  filterButton: {
    marginBottom: 10,
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
    alignSelf: 'center',
    margin: 5,
  },
  launchDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
});

export default Launches;
