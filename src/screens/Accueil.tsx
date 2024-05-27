import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PropsWithChildren, useEffect, useState} from 'react';
import styles from '../components/styles';
import api from '../services/ApiService';

const Stack = createNativeStackNavigator();
const Accueil = ({navigation}: PropsWithChildren<any>): JSX.Element => {
  const [events, setEvent] = useState([]);
  useEffect(() => {
    api.getEventList().then(response => {
      console.log(response.data);
      setEvent(response.data);
    });
  }, []);

  return (
    <View style={styless.container}>
      <Text style={styles.titre}>Accueil</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Utilisateurs')}>
        <Text style={styles.buttonText}>Voir la liste des utilisateurs</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profil')}>
        <Text style={styles.buttonText}>Voir votre profil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={async () => await api.getEventList()}>
        <Text style={styles.buttonText}>Call API fusées</Text>
      </TouchableOpacity>

      <FlatList
        data={events}
        keyExtractor={(event: any) => event.count}
        renderItem={({item}: any) => (
          <View>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styless = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Accueil;
