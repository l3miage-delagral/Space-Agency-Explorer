import React, { PropsWithChildren } from 'react';
import { Appbar, Menu, PaperProvider } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Accueil from './src/screens/Accueil';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapScreen from './src/screens/MapScreen';


const Stack = createNativeStackNavigator();

const App = ({props} :PropsWithChildren<any>): JSX.Element => {

  return (
  <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Map"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}>
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Map" component={MapScreen} />
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
} : any) {

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {back ? (
        <Appbar.Action
          icon={() => (
            <MaterialIcons name="arrow-back" size={24} color="black" />
          )}
          onPress={navigation.goBack}
        />
      ) : null}
      {back ? <Appbar.Content title={title} /> : null}
      {!back ? <Appbar.Content title="{title}" /> : null}

      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}>
          <Menu.Item
            onPress={() => {
              console.log('Option 1 was pressed');
            }}
            title="Option 1"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 2 was pressed');
            }}
            title="Option 2"
          />
          <Menu.Item
            onPress={() => {
              console.log('Option 3 was pressed');
            }}
            title="Option 3"
            disabled
          />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}

export default App;
