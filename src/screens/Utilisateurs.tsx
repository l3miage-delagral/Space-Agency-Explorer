import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import DetailProfil from '../components/DetailProfil';
import styles from '../components/styles';

const Profile = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch( 'https://jsonplaceholder.typicode.com/users' )
            .then(result => result.json())
            .then(data => {
                setUsers(data);
            });
    }, []);
    return (
        <View style={styless.view}>
            <Text style={styles.titre}>Récupérer la liste des utilisateurs</Text>
            <Text style={styless.sousTitre}>Résultats</Text>

                <FlatList
                    style={styless.container}
                    data={users}
                    keyExtractor={(user: any) => user.id}
                    renderItem={({item}: any) => (
                        <DetailProfil param={item} />
                )}
                />
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
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        height: '70%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    sousTitre: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        position: 'absolute',
        top: 150,
    }
    }
);

export default Profile;