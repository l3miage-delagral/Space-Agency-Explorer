import {StyleSheet, TextInput, View} from 'react-native';
import {useState} from 'react';
import Launches from '../components/Launches';

const Accueil = ({ navigation }: any): JSX.Element => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher des événements"
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.cardContainer}>
        <Launches navigation={navigation} search={search} />
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
});

export default Accueil;
