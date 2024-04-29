import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PropsWithChildren } from "react";
import styles from "../components/styles";
import api from "../services/ApiService";

const Stack = createNativeStackNavigator();

const Accueil = ({navigation}:PropsWithChildren<any>): JSX.Element => {
    return (
        
        <View style={styless.container}>
        <Text style={styles.titre}>Accueil</Text>
        
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Utilisateurs')}
        >
            <Text style={styles.buttonText}>Voir la liste des utilisateurs</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Profil')}
            
        >
            <Text style={styles.buttonText}>Voir votre profil</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.button}
            onPress={async () => await api.getLaunchPads()}
            
        >
            <Text style={styles.buttonText}>Call API fusées</Text>
        </TouchableOpacity>
        </View>
    );
    }

const styless = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        }
    });

export default Accueil;