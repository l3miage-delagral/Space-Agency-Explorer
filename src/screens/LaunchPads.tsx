import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, Image, Text } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import api from '../services/ApiService';
import { Pad } from '../models/types';

// Set your Mapbox access token
MapboxGL.setAccessToken('sk.eyJ1IjoiYWxsZWt6eCIsImEiOiJjbHc3bjQ2OHoxaTBhMnRyejBydnV1NnNxIn0.lrAAByp5lJSk_PdIYYleEQ');

// variable avec getLaunchPads de l'api
let pads = api.getLaunchPads();

const LaunchPads = () => {
  const [pads, setPads] = useState([] as Pad[]);
  const [selectedPad, setSelectedPad] = useState<Pad | null>(null);
  const { width, height } = Dimensions.get('window');  // Get screen dimensions

  useEffect(() => {
    const fetchPads = async () => {
      try {
        const padsData = await api.getLaunchPads();
        setPads(padsData);
      } catch (error) {
        console.error('Failed to fetch launch pads:', error);
      }
    };

    fetchPads();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, width, height }}>
      <View style={{ flex: 1 }}>
        <MapboxGL.MapView style={{ flex: 1 }}>
          <MapboxGL.Camera
            zoomLevel={2}
            centerCoordinate={[-95.844032, 36.966428]}
          />
          {pads.map(pad => (
            <MapboxGL.MarkerView 
              key={pad.id} 
              coordinate={[pad.longitude,pad.latitude]}>
              <View style={styles.markerContainer}>
                <Image
                  source={{ uri: 'https://img.icons8.com/color/48/000000/marker.png' }}
                  style={styles.markerImage}
                />
                <Text style={styles.markerText}>{pad.name}</Text>
              </View>
            </MapboxGL.MarkerView>
          ))}
        </MapboxGL.MapView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerImage: {
    width: 50,
    height: 50,
  },
  markerText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LaunchPads;
