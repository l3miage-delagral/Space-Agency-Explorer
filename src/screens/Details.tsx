import { StyleSheet, Text, View, } from 'react-native';
import React, { PropsWithChildren } from 'react';
import EventDetail from '../components/EventDetail';
import LaunchDetail from '../components/LaunchDetail';
import DockingDetail from '../components/DockingDetail';

const Details = ({route, navigation }: PropsWithChildren<any>): JSX.Element => {
  const { eventId, eventType } = route.params;

  const renderEventComponent = () => {
    if (eventType === 'launch') {
      return <LaunchDetail route={route} navigation={navigation}/>;
    } else if (eventType === 'event') {
      return <EventDetail route={eventId} navigation={navigation} />;
    } else if (eventType === 'docking') {
      return <DockingDetail route={eventId} navigation={navigation} />;
    } else {
      return <Text>No component found for this event type</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {renderEventComponent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardContainer: {
    padding: 10,
    width: '100%',
    height: '100%',
  },
});

export default Details;