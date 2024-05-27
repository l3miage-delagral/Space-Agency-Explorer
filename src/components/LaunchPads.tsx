import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { Pad } from '../models/types';
import ApiService from '../services/ApiService';

// Set your Mapbox access token
MapboxGL.setAccessToken('sk.eyJ1IjoiYWxsZWt6eCIsImEiOiJjbHc3bjQ2OHoxaTBhMnRyejBydnV1NnNxIn0.lrAAByp5lJSk_PdIYYleEQ');

interface LaunchPadsProps {
  onSelectPad: (pad: Pad) => void;
  onDeselectPad: () => void;
}

const LaunchPads: React.FC<LaunchPadsProps> = ({ onSelectPad, onDeselectPad }) => {
  const [pads, setPads] = useState<Pad[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <MapboxGL.MapView style={{ flex: 1 }} onPress={onDeselectPad}>
      {pads.map(pad => (
        <MapboxGL.MarkerView
          key={pad.id.toString()}
          coordinate={[pad.longitude, pad.latitude]}
        >
          <TouchableOpacity onPress={() => onSelectPad(pad)}>
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
  );
};

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LaunchPads;
