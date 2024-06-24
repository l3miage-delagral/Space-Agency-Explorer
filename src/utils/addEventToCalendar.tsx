import { Alert, Platform, Linking } from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';

export const addEventToCalendar = async (title: string, startDate: Date, location: string) => {
  try {
    const permission = await RNCalendarEvents.requestPermissions();
    if (permission === 'authorized') {
      const eventConfig = {
        title,
        startDate: startDate.toISOString(),
        endDate: new Date(startDate.getTime() + 2 * 60 * 60 * 1000).toISOString(),
        location,
      };

      const eventId = await RNCalendarEvents.saveEvent(title, eventConfig);

      if (eventId) {
        Alert.alert('Success', 'Event has been added to your calendar', [
          {
            text: 'Open Calendar',
            onPress: () => {
              if (Platform.OS === 'ios') {
                // sous iOS
                const startDateISOString = startDate.toISOString();
                Linking.openURL(`calshow:${new Date(startDateISOString).getTime() / 1000}`);
              } else {
                // sous android
                const startDateISOString = startDate.toISOString();
                const uri = `content://com.android.calendar/time/${new Date(startDateISOString).getTime()}`;
                Linking.openURL(uri);
              }
            },
          },
        ]);
      } else {
        Alert.alert('Error', 'Failed to add event to calendar');
      }
    } else {
      Alert.alert('Permission Denied', 'Calendar permissions are required to add events');
    }
  } catch (e) {
    console.error(e);
    Alert.alert('Error', 'An error occurred while adding the event to the calendar');
  }
};
