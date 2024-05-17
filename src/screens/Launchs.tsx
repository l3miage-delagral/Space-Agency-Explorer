import React from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, Image, Text } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

// Set your Mapbox access token
MapboxGL.setAccessToken('sk.eyJ1IjoiYWxsZWt6eCIsImEiOiJjbHc3bjQ2OHoxaTBhMnRyejBydnV1NnNxIn0.lrAAByp5lJSk_PdIYYleEQ');

const launchPads = [
  { id: '1', name: 'Launch Pad 1', coordinate: [-80.5772, 28.5623] },
  { id: '2', name: 'Launch Pad 2', coordinate: [-80.5772, 28.5723] },
  // Ajoutez d'autres launch pads ici
];

const Launchs = () => {
  const { width, height } = Dimensions.get('window');  // Get screen dimensions

  return (
    <SafeAreaView style={{ flex: 1, width, height }}>
      <View style={{ flex: 1 }}>
        <MapboxGL.MapView style={{ flex: 1 }}>
          <MapboxGL.Camera
            zoomLevel={12}
            centerCoordinate={[-80.5772, 28.5623]}
          />
          {launchPads.map(pad => (
            <MapboxGL.MarkerView key={pad.id} coordinate={pad.coordinate}>
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
  },
});

export default Launchs;
