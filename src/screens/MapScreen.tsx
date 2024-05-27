import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { Pad } from '../models/types';
import ApiService from '../services/ApiService';

MapboxGL.setAccessToken('sk.eyJ1IjoiYWxsZWt6eCIsImEiOiJjbHc3bjQ2OHoxaTBhMnRyejBydnV1NnNxIn0.lrAAByp5lJSk_PdIYYleEQ');

const MapScreen = () => {
  const [pads, setPads] = useState([] as Pad[]);
  const [selectedPad, setSelectedPad] = useState<Pad | null>(null);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [centerCoordinate, setCenterCoordinate] = useState([-95.844032, 36.966428]);
  const [isLoading, setIsLoading] = useState(true);
  const { width, height } = Dimensions.get('window');  // Get screen dimensions

  useEffect(() => {
    const fetchPads = async () => {
      try {
        const padsData = await ApiService.getLaunchPads();
        if (Array.isArray(padsData)) {
          setPads(padsData);
        } else {
          console.error('Pads data is not an array:', padsData);
        }
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
    setZoomLevel(10);
    setCenterCoordinate([pad.longitude, pad.latitude]);
  };

  const handleMapPress = () => {
    setSelectedPad(null);
    setZoomLevel(2); // Reset zoom level
    setCenterCoordinate([-95.844032, 36.966428]); // Reset center coordinate
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
            animationDuration={2000}
          />
          {pads.map(pad => (
            <MapboxGL.MarkerView
              key={pad.id.toString()}
              coordinate={[pad.longitude, pad.latitude]}
            >
              <TouchableOpacity onPress={() => handleMarkerPress(pad)}>
                <View style={styles.markerContainer}>
                  <Image
                    source={require('../assets/marker.png')}
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
              <Text style={styles.cardText}>Location: {selectedPad.location.name}</Text>
              <Text style={styles.cardText}>Total Launch Count: {selectedPad.total_launch_count}</Text>
              <Text style={styles.cardText}>Orbital Launch Attempt Count : {selectedPad.orbital_launch_count ?? 0}</Text>
              <View style={styles.linksContainer}>
                {selectedPad.wiki_url && (
                  <TouchableOpacity onPress={() => Linking.openURL(selectedPad.wiki_url)} style={styles.logoButton}>
                    <Image
                      source={require('../assets/wikipedia-logo.png')}
                      style={styles.logo}
                    />
                  </TouchableOpacity>
                )}
                {selectedPad.map_url && (
                  <TouchableOpacity onPress={() => Linking.openURL(selectedPad.map_url)} style={styles.logoButton}>
                    <Image
                      source={require('../assets/google_maps_logo.png')}
                      style={styles.logo}
                    />
                  </TouchableOpacity>
                )}
              </View>
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
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
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
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff0000',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MapScreen;
