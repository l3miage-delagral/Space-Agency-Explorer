import React, { PropsWithChildren } from 'react';
import { Appbar, Menu, PaperProvider } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Image, StyleSheet, View, Text } from 'react-native';
import Accueil from './src/screens/Accueil';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapScreen from './src/screens/MapScreen';
import EventDetails from './src/screens/EventDetails';

const Stack = createNativeStackNavigator();

const App = ({ props }: PropsWithChildren<any>): JSX.Element => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Accueil"
          screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
          }}
        >
          <Stack.Screen name="Accueil" component={Accueil} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="EventDetails" component={EventDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function CustomNavigationBar({
  navigation,
  route,
  options,
  back,
}: any) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      <View style={styles.headerContainer}>
        {back ? (
          <Appbar.Action
            icon={() => (
              <MaterialIcons name="arrow-back" size={24} color="black" />
            )}
            onPress={navigation.goBack}
          />
        ) : (
          <Image
            source={require('./src/assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>SAE</Text>
        </View>
        {!back ? (
          <View style={styles.menuContainer}>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
            >
              <Menu.Item
                onPress={() => {
                  navigation.navigate('Map');
                }}
                title="Map"
              />
              <Menu.Item
                onPress={() => {
                  console.log('Option 2 was pressed');
                }}
                title="Astronauts"
              />
              <Menu.Item
                onPress={() => {
                  console.log('Option 3 was pressed');
                }}
                title="Missions"
              />
            </Menu>
          </View>
        ) : null}
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginRight: 10,
  },
});

export default App;
