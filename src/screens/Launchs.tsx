import React from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import Mapbox from '@rnmapbox/maps';


Mapbox.setAccessToken('sk.eyJ1IjoiYWxsZWt6eCIsImEiOiJjbHc3bjQ2OHoxaTBhMnRyejBydnV1NnNxIn0.lrAAByp5lJSk_PdIYYleEQ');

const Launchs = () => {
  const { width, height } = Dimensions.get('window');  // Get screen dimensions
  return (
    <SafeAreaView style={{ flex: 1, width, height }}>
        <View style={{ flex: 1, width, height }}>
          <Mapbox.MapView style={{ flex: 1, width, height }} />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body : {
    flex: 1,
  },
  container: {

  }
});

export default Launchs;