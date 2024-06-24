import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import Launches from '../components/Launches';
import Events from '../components/Events';
import Dockings from '../components/Dockings';
import { Menu, Button, IconButton } from 'react-native-paper';

const Accueil = ({ route, navigation }: any): JSX.Element => {
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('dateDesc');
  const type = route.params?.type || 'launches';
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const renderComponent = () => {
    switch (type) {
      case 'dockings':
        return <Dockings navigation={navigation} search={search} sortOption={sortOption}/>;
      case 'launches':
        return <Launches navigation={navigation} search={search} sortOption={sortOption} />;
      default:
        return <Events navigation={navigation} search={search} sortOption={sortOption} />;
    }
  };

  const getPageName = (type: string) => {
    switch (type) {
      case 'dockings':
        return 'Dockings';
      case 'launches':
        return 'Launches';
      default:
        return 'Events';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher des événements"
          value={search}
          onChangeText={setSearch}
        />
        <IconButton
          icon="close"
          size={20}
          onPress={() => setSearch('')}
          style={styles.clearButton}
        />
      </View>
      <View style={styles.titre}>
        <Text style={styles.pageName}>{getPageName(type)}</Text>
        <Menu
          style={styles.menuTri}
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button icon="sort" onPress={openMenu} children={undefined}/>}>
          <Menu.Item onPress={() => { setSortOption('nameAsc'); closeMenu(); }} title="Name Asc" />
          <Menu.Item onPress={() => { setSortOption('nameDesc'); closeMenu(); }} title="Name Desc" />
          <Menu.Item onPress={() => { setSortOption('dateAsc'); closeMenu(); }} title="Date Asc" />
          <Menu.Item onPress={() => { setSortOption('dateDesc'); closeMenu(); }} title="Date Desc" />
        </Menu>
      </View>
      <View style={styles.cardContainer}>
        {renderComponent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 100,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
    flex: 1,
  },
  clearButton: {
    marginRight: 10,
    position: 'absolute',
    marginLeft: '85%',
  },
  cardContainer: {
    padding: 10,
    width: '100%',
    height: '100%',
  },
  pageName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuTri: {
    alignSelf: 'flex-end',
  },
  titre: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignContent: 'center',
    alignItems: 'center',
  },
});

export default Accueil;
