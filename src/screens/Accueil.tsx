import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import Launches from '../components/Launches';
import Events from '../components/Events';

const Accueil = ({ route, navigation }: any): JSX.Element => {
  const [search, setSearch] = useState('');
  const type = route.params?.type || 'launches';

  const renderComponent = () => {
    switch (type) {
      case 'events':
        return <Events navigation={navigation} search={search} />;
      case 'launches':
      default:
        return <Launches navigation={navigation} search={search} />;
    }
  };

  const getPageName = (type: string) => {
    switch (type) {
      case 'events':
        return 'Events';
      case 'launches':
      default:
        return 'Launches';
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher des événements"
        value={search}
        onChangeText={setSearch}
      />
      <Text style={styles.pageName}>{getPageName(type)}</Text>
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
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
    width: '90%',
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
});

export default Accueil;
