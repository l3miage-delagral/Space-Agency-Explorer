import React, { PropsWithChildren } from 'react';
import { Appbar, Menu, PaperProvider } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Accueil from './src/screens/Accueil';
import Utilisateurs from './src/screens/Utilisateurs';
import Profil from './src/screens/Profil';
import Launchs from './src/screens/Launchs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Stack = createNativeStackNavigator();

const App = ({props} :PropsWithChildren<any>): JSX.Element => {

  return (
  <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Launchs"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}>
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="Utilisateurs" component={Utilisateurs} />
        <Stack.Screen name="Profil" component={Profil} />
        <Stack.Screen name="Launchs" component={Launchs} />
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
      {back ? <Appbar.Action icon={() => <MaterialIcons name="arrow-back" size={24} color="black" />} onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              onPress={openMenu}
            />
          }>
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
