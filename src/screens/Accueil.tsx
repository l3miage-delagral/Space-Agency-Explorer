import {StyleSheet, TextInput, View} from 'react-native';
import {useState} from 'react';
import Events from '../components/Events';

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
        <Events navigation={navigation} search={search} />
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
  eventContainer: {
    padding: 10,
    marginVertical: 10, // Augmenter la marge verticale
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  eventImage: {
    width: '100%', // Prendre toute la largeur
    height: 200, // Augmenter la hauteur de l'image
    borderRadius: 10,
    marginBottom: 10, // Ajouter une marge en bas
  },
  textContainer: {
    flex: 1,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 12,
    color: '#888',
  },
  eventInfoUrl: {
    fontSize: 12,
    color: '#1e90ff',
    marginTop: 5,
  },
  eventNewsUrl: {
    fontSize: 12,
    color: '#1e90ff',
    marginTop: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default Accueil;
