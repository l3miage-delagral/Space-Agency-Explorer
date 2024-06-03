import React, { PropsWithChildren, useState } from 'react';
import { Appbar, Menu, Provider as PaperProvider } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Image, StyleSheet, View, Text } from 'react-native';
import Accueil from './src/screens/Accueil';
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
};

function CustomNavigationBar({
  navigation,
  route,
  options,
  back,
}: any) {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      <View style={styles.headerContainer}>
        {back ? (
          <Appbar.BackAction onPress={navigation.goBack} />
        ) : (
          <View style={styles.logoContainer}>
            <Image
            source={require('./src/assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          </View>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>SAE</Text>
          <Text style={styles.subtitle}>Space Agency Explorer</Text>
        </View>
        {!back ? (
          <View style={styles.menuContainer}>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              style={styles.menu}
              anchor={<Appbar.Action icon="menu" onPress={openMenu} />}
            >
              <Menu.Item
                onPress={() => {
                  navigation.navigate('Map');
                }}
                title="Pads"
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
    justifyContent: 'space-between',
    flex: 1,
  },
  logoContainer: {
    left: 0,
    justifyContent: 'center',
    marginTop: 10,
  },
  logo: {
    width: 70,
    height: 70,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  subtitle: {
    fontSize: 14,
  },
  menu: {
    
  }
});

export default App;
