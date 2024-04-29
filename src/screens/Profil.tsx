import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import styles from '../components/styles';


const Stack = createNativeStackNavigator();

const Home = () => {
    const [nom, setName] = useState('Dupont');
    let entree = nom;

    return (
        <View style={styless.view}>
            <Text style={styles.titre}>Bonjour {nom}</Text>
            <View style={styless.formulaire}>
                <View>
                    <Text style={styles.sousTitre}>Nom de famille :</Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, marginTop: 20, fontSize: 20}}
                        onChangeText={text => entree = text}
                        defaultValue={nom}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setName(entree)}
                >
                    <Text style={styles.buttonText}>Valider</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

const styless = StyleSheet.create({
    view: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
    },
    formulaire: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
    }
});

export default Home;