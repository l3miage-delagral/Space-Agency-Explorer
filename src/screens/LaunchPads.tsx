import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/ApiService';
import { Pad } from '../models/types';

// Set your Mapbox access token
MapboxGL.setAccessToken('sk.eyJ1IjoiYWxsZWt6eCIsImEiOiJjbHc3bjQ2OHoxaTBhMnRyejBydnV1NnNxIn0.lrAAByp5lJSk_PdIYYleEQ');

const CACHE_KEY = 'launchPadsCache';

const LaunchPads = () => {
  const [pads, setPads] = useState([] as Pad[]);
  const [selectedPad, setSelectedPad] = useState<Pad | null>(null);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [centerCoordinate, setCenterCoordinate] = useState([-95.844032, 36.966428]);
  const [isLoading, setIsLoading] = useState(true);
  const { width, height } = Dimensions.get('window');  // Get screen dimensions

  useEffect(() => {
    const fetchPads = async () => {
      try {
        const cachedPads = await AsyncStorage.getItem(CACHE_KEY);
        if (cachedPads) {
          setPads(JSON.parse(cachedPads));
          setIsLoading(false);
        }

        const padsData = await api.getLaunchPads();
        setPads(padsData);
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(padsData));
      } catch (error) {
        console.error('Failed to fetch launch pads:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPads();
  }, []);

  const handleMarkerPress = (pad: Pad) => {
    setSelectedPad(pad);
    setZoomLevel(10); // Set the desired zoom level when a marker is clicked
    setCenterCoordinate([pad.longitude, pad.latitude]);
  };

  const handleMapPress = () => {
    setSelectedPad(null);
  };

  const handleCloseCard = () => {
    setSelectedPad(null);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, width, height }}>
      <View style={{ flex: 1 }}>
        <MapboxGL.MapView style={{ flex: 1 }} onPress={handleMapPress}>
          <MapboxGL.Camera
            zoomLevel={zoomLevel}
            centerCoordinate={centerCoordinate}
            animationDuration={2000} // Animation duration in milliseconds
          />
          {pads.map(pad => (
            <MapboxGL.MarkerView
              key={pad.id.toString()}
              coordinate={[pad.longitude, pad.latitude]}
            >
              <TouchableOpacity onPress={() => handleMarkerPress(pad)}>
                <View style={styles.markerContainer}>
                  <Image
                    source={{ uri: 'https://img.icons8.com/color/48/000000/marker.png' }}
                    style={styles.annotationImage}
                  />
                  <Text style={styles.markerText}>{pad.name}</Text>
                </View>
              </TouchableOpacity>
            </MapboxGL.MarkerView>
          ))}
        </MapboxGL.MapView>
        {selectedPad && (
          <View style={styles.cardContainer}>
            <ScrollView>
              <Text style={styles.cardTitle}>{selectedPad.name}</Text>
              {selectedPad.description && <Text style={styles.cardDescription}>{selectedPad.description}</Text>}
              <Text style={styles.cardText}>Country: {selectedPad.country_code}</Text>
              <Text style={styles.cardText}>Total Launch Count: {selectedPad.total_launch_count}</Text>

              {selectedPad.wiki_url && (
                <Text style={styles.cardLink} onPress={() => Linking.openURL(selectedPad.wiki_url)}>Wikipedia</Text>
              )}
              {selectedPad.map_url && (
                <Text style={styles.cardLink} onPress={() => Linking.openURL(selectedPad.map_url)}>Map</Text>
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  annotationImage: {
    width: 50,
    height: 50,
  },
  markerText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardDescription: {
    marginTop: 10,
    fontSize: 16,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
  },
  cardLink: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LaunchPads;
