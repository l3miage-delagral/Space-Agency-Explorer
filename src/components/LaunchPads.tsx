import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { Pad } from '../models/types';
import ApiService from '../services/ApiService';

interface LaunchPadsProps {
  onPadsLoaded: (pads: Pad[]) => void;
}

const LaunchPads: React.FC<LaunchPadsProps> = ({ onPadsLoaded }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPads = async () => {
      try {
        const padsData = await ApiService.getLaunchPads();
        if (Array.isArray(padsData)) {
          onPadsLoaded(padsData);
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
  }, [onPadsLoaded]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LaunchPads;
